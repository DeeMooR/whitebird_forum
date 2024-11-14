import React, { FC } from 'react'
import { useSelector } from 'react-redux';
import { getUserSelector } from 'src/redux/selectors';
import { favoriteIcon } from 'src/assets';
import { IPost } from 'src/interfaces';
import cls from './styles.module.scss';

interface ICard {
  post: IPost
}

export const Card:FC<ICard> = ({post }) => {
  const { id, userId, title } = post;
  const { role } = useSelector(getUserSelector);

  return (
    <div className={cls.card}>
      {role !== 'unauthorized' &&
        <div className={cls.card__star}>
          <img src={favoriteIcon} alt="favorite" />
        </div>
      }
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
