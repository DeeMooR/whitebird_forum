import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsSelector, getUserSelector } from 'src/redux/selectors';
import { deleteLocalPost, deletePost, updateUserFavoritePosts } from 'src/redux/slices';
import { basketIcon, favoriteFillIcon, favoriteIcon, pencilIcon } from 'src/assets';
import { ChangePriority, ModalConfirm, ModalManage, PostMoving } from 'src/components';
import { getTextPluralComments, getUsernameById } from './config';
import { ROLES } from 'src/config';
import { IPost } from 'src/interfaces';
import cls from './styles.module.scss';

interface ICard {
  post: IPost,
  showControls?: boolean,
  showPriority?: boolean,
  movingPostsId?: {
    upPostId: number | null,
    downPostId: number | null,
  } | null
}

export const Card:FC<ICard> = ({ post, showControls, showPriority, movingPostsId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector(getPostsSelector);
  const { favoritePosts, role } = useSelector(getUserSelector);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const { id, userId, title, comments_number, priority } = post;
  const username = getUsernameById(users, userId);
  const isLocalPost = id > 100; // новые посты хранятся и обновляются в localState

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
      {showPriority &&
        <ChangePriority postId={id} defaultValue={priority || 1} isLocalPost={isLocalPost} />
      }
      <div className={cls.card__content}>
        {role !== ROLES.UNAUTHORIZED &&
          <div className={cls.card__star}>
            {favoritePosts.includes(id)
              ? <img src={favoriteFillIcon} onClick={handleClickFavorite} alt="favoriteFill" />
              : <img src={favoriteIcon} onClick={handleClickFavorite} alt="favorite" />
            }
          </div>
        }
        <div className={cls.card__info}>
          <p className={cls.card__author}>{username}</p>
          <h3 className={cls.card__title} onClick={handleClickPost}>{title}</h3>
        </div>
        <div className={cls.card__comments}>
          <p className={cls.comments__counter}>{comments_number || 0}</p>
          <p className={cls.comments__text}>{getTextPluralComments(comments_number || 0)}</p>
        </div>
        {showControls &&
          <div className={cls.card__controls}>
            <img src={pencilIcon} onClick={() => setModalUpdate(true)} alt="pencil" />
            <img src={basketIcon} onClick={() => setModalDelete(true)} alt="basket" />
          </div>
        }
        {movingPostsId &&
          <PostMoving postId={post.id} movingPostsId={movingPostsId} />
        }
      </div>
      {modalUpdate && 
        <ModalManage 
          id={isLocalPost ? 'localPosts_update' : 'posts_update'}
          defaultObj={post} 
          type='post'
          action='update' 
          closeModal={() => setModalUpdate(false)} 
        />
      }
      {modalDelete && <ModalConfirm action='delete_post' clickApply={handleDelete} closeModal={() => setModalDelete(false)} />}
    </div>
  )
}
