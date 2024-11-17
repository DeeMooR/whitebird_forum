import React from 'react'
import { useSelector } from 'react-redux';
import { getPostSelector } from 'src/redux/selectors';
import { Comment } from 'src/components';
import cls from './styles.module.scss';

export const PostComments = () => {
  const { comments } = useSelector(getPostSelector);

  return (
    <div className={cls.comments}>
      <div className={cls.comments__header}>
        <p className={cls.header__text}>{`Комментарии (${comments.length})`}</p>
        <hr className={cls.header__line} />
      </div>
      <div className={cls.comments__list}>
        {comments.map(item => (
          <Comment obj={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}