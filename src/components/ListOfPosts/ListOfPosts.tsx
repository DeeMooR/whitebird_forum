import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux';
import { getLocalIsLoadingSelector, getPostsSelector } from 'src/redux/selectors';
import { IPost } from 'src/interfaces';
import { Card } from 'src/components';
import { Loading } from 'src/UI';
import { getMovingPostsId } from './config';
import { STEP_POSTS } from 'src/config';
import cls from './styles.module.scss';

interface IListOfPosts {
  posts: IPost[],
  emptyText: string,
  withLimit?: boolean,
  showControls?: boolean,
  showPriority?: boolean,
}

export const ListOfPosts:FC<IListOfPosts> = ({posts, emptyText, withLimit, showControls, showPriority}) => {
  const [limit, setLimit] = useState(withLimit ? STEP_POSTS : null);
  const { isLoading } = useSelector(getPostsSelector);
  const isLocalLoading = useSelector(getLocalIsLoadingSelector);

  const handleShowMore = () => {
    setLimit((prev) => prev! + STEP_POSTS)
  }

  return (
    <div className={cls.listOfPosts}>
      {isLoading || isLocalLoading ? (
        <div className={cls.listOfPosts__loading}>
          <Loading />
        </div>
      ) : (
        !!posts.length ? (
          <>
            <div className={cls.listOfPosts__list}>
              {posts.slice(0, limit || posts.length).map((post) => (
                <Card 
                  post={post} 
                  showControls={showControls} 
                  showPriority={showPriority} 
                  movingPostsId={showPriority ? getMovingPostsId(posts, post.id) : null}
                  key={post.id} 
                />
              ))}
            </div>
            {limit && limit < posts.length &&
              <button className={cls.listOfPosts__btnShowMore} onClick={handleShowMore}>Показать ещё</button>
            }
          </>
        ) : (
          <p className={cls.listOfPosts__empty}>{emptyText}</p>
        )
      )}
    </div>
  )
}
