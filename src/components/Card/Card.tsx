import React, { FC } from 'react'
import cls from './styles.module.scss';
import { favoriteIcon } from 'src/assets';
import { IPost } from 'src/interfaces';

interface ICard {
  post: IPost
}

export const Card:FC<ICard> = ({post }) => {
  const { id, userId, title } = post;

  return (
    <div className={cls.card}>
      <div className={cls.card__star}>
        <img src={favoriteIcon} alt="favorite" />
      </div>
      <div className={cls.card__info}>
        <p className={cls.card__author}>{userId}</p>
        <p className={cls.card__title}>{title}</p>
      </div>
      <div className={cls.card__comments}>
        <p className={cls.comments__counter}>0</p>
        <p className={cls.comments__text}>коммент</p>
      </div>
    </div>
  )
}
