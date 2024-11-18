import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPostsSelector, getUserSelector } from 'src/redux/selectors';
import { deleteLocalPost, deletePost, updateUserFavoritePosts } from 'src/redux/slices';
import { basketIcon, favoriteFillIcon, favoriteIcon, pencilIcon } from 'src/assets';
import { ModalConfirm, ModalManage } from 'src/components';
import { getUsernameById } from 'src/config';
import { IPost } from 'src/interfaces';
import cls from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

interface ICard {
  post: IPost,
  showControls?: boolean
}

export const Card:FC<ICard> = ({ post, showControls }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector(getPostsSelector);
  const { favoritePosts, role } = useSelector(getUserSelector);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const { id, userId, title, comments_number } = post;
  const username = getUsernameById(users, userId);
  const isLocalPost = id > 100;

  const handleClickPost = () => {
    navigate(`/forum/${id}`);
  }

  const handleClickFavorite = () => {
    dispatch(updateUserFavoritePosts(id));
  }

  const handleDelete = () => {
    const func = isLocalPost ? deleteLocalPost({postId: id, navigate}) : deletePost(id);
    dispatch(func);
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
        <p className={cls.card__title} onClick={handleClickPost}>{title}</p>
      </div>
      <div className={cls.card__comments}>
        <p className={cls.comments__counter}>{comments_number || 0}</p>
        <p className={cls.comments__text}>ответов</p>
      </div>
      {showControls &&
        <div className={cls.card__buttons}>
          <img src={pencilIcon} onClick={() => setModalUpdate(true)} alt="pencil" />
          <img src={basketIcon} onClick={() => setModalDelete(true)} alt="basket" />
        </div>
      }
      {modalUpdate && 
        <ModalManage 
          id={isLocalPost ? 'localPosts_update' : 'posts_update'}
          obj={post} 
          type='post'
          action='update' 
          closeModal={() => setModalUpdate(false)} 
        />
      }
      {modalDelete && <ModalConfirm action='delete_post' clickApply={handleDelete} closeModal={() => setModalDelete(false)} />}
    </div>
  )
}
