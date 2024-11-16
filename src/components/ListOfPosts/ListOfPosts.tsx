import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { getForumSelector } from 'src/redux/selectors';
import { IPost } from 'src/interfaces';
import { Card } from 'src/components';
import { Loading } from 'src/UI';
import cls from './styles.module.scss';

interface IListOfPosts {
  posts: IPost[],
  emptyText: string,
}

export const ListOfPosts:FC<IListOfPosts> = ({posts, emptyText}) => {
  const { isLoading } = useSelector(getForumSelector);

  return (
    <div className={cls.listOfPosts}>
      {isLoading ? (
        <div className={cls.listOfPosts__loading}>
          <Loading />
        </div>
      ) : (
        !!posts.length ? (
          <div className={cls.listOfPosts__list}>
            {posts.map((post) => (
              <Card post={post} key={post.id} />
            ))}
          </div>
        ) : (
          <p className={cls.listOfPosts__empty}>{emptyText}</p>
        )
      )}
    </div>
  )
}
