import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getForumSelector, getUserSelector } from 'src/redux/selectors';
import { favoriteFillIcon, favoriteIcon } from 'src/assets';
import { IPost } from 'src/interfaces';
import cls from './styles.module.scss';
import { getUsernameById } from 'src/config';
import { updateUserFavoritePosts } from 'src/redux/slices';

interface ICard {
  post: IPost
}

export const Card:FC<ICard> = ({post }) => {
  const dispatch = useDispatch();
  const { favoritePosts, role } = useSelector(getUserSelector);
  const { users } = useSelector(getForumSelector);
  const { id, userId, title, comments_number } = post;
  const username = getUsernameById(users, userId);

  const handleClickFavorite = () => {
    dispatch(updateUserFavoritePosts(id));
  }

  return (
    <div className={cls.card}>
      {role !== 'unauthorized' &&
        <div className={cls.card__star}>
          {favoritePosts.includes(id)
            ? <img src={favoriteFillIcon} onClick={handleClickFavorite} alt="favoriteFill" />
            : <img src={favoriteIcon} onClick={handleClickFavorite} alt="favorite" />
          }
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
