import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { getForumSelector, getUserSelector } from 'src/redux/selectors';
import { favoriteIcon } from 'src/assets';
import { IPostForum } from 'src/interfaces';
import cls from './styles.module.scss';
import { getUsernameById } from 'src/config';

interface ICard {
  post: IPostForum
}

export const Card:FC<ICard> = ({post }) => {
  const { userId, title, comments_number } = post;
  const { role } = useSelector(getUserSelector);
  const { users } = useSelector(getForumSelector);
  const username = getUsernameById(users, userId);

  return (
    <div className={cls.card}>
      {role !== 'unauthorized' &&
        <div className={cls.card__star}>
          <img src={favoriteIcon} alt="favorite" />
        </div>
      }
      <div className={cls.card__info}>
        <p className={cls.card__author}>{username}</p>
        <p className={cls.card__title}>{title}</p>
      </div>
      <div className={cls.card__comments}>
        <p className={cls.comments__counter}>{comments_number || 0}</p>
        <p className={cls.comments__text}>коммент</p>
      </div>
    </div>
  )
}
