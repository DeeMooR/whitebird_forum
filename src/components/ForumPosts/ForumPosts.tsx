import React, { FC, useState } from 'react'
import { IPostForum } from 'src/interfaces';
import { STEP_POSTS } from 'src/config';
import { Card } from 'src/components';
import cls from './styles.module.scss';

interface IForumPosts {
  posts: IPostForum[]
}

export const ForumPosts:FC<IForumPosts> = ({ posts }) => {
  const [limit, setLimit] = useState(STEP_POSTS);

  const handleShowMore = () => {
    setLimit((prev) => prev + STEP_POSTS)
  }
  
  return (
    <div className={cls.forumPosts}>
      {!!posts.length ? (
        <>
          <div className={cls.forumPage__list}>
            {posts.slice(0, limit).map((post) => (
              <Card post={post} key={post.id} />
            ))}
          </div>
          {limit < posts.length &&
            <button className={cls.forumPage__btnShowMore} onClick={handleShowMore}>Показать ещё</button>
          }
        </>
      ) : (
        <p className={cls.forumPosts__empty}>По выбранным критериям постов не найдено</p>
      )}
    </div>
  )
}
