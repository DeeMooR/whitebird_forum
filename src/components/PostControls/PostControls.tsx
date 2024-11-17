import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getControlsInPostSelector, getPostSelector, getUserSelector } from 'src/redux/selectors';
import { deletePostInPostPage, updatePostDislikes, updatePostLikes, updateUserFavoritePosts } from 'src/redux/slices';
import { basketIcon, dislikeFillIcon, dislikeIcon, favoriteFillIcon, favoriteIcon, likeFillIcon, likeIcon, pencilIcon } from 'src/assets';
import { ModalConfirm, ModalManage } from 'src/components';
import cls from './styles.module.scss';

export const PostControls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, user } = useSelector(getPostSelector);
  const { favoritePosts, role } = useSelector(getUserSelector);
  const { likeUserIds, dislikeUserIds } = useSelector(getControlsInPostSelector);
  const isAuthorized = role !== 'unauthorized';

  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleClickLike = () => {
    if (!isAuthorized) return;
    dispatch(updatePostLikes(user?.id));
  }

  const handleClickDislike = () => {
    if (!isAuthorized) return;
    dispatch(updatePostDislikes(user?.id));
  }

  const handleClickFavorite = () => {
    dispatch(updateUserFavoritePosts(post?.id));
  }

  const handleDelete = () => {
    dispatch(deletePostInPostPage({id: post?.id, navigate}));
  }
  
  return (
    <div className={cls.controls}>
      <div className={cls.controls__feedback}>
        <div className={cls.feedback} onClick={handleClickLike}>
          {user && likeUserIds.includes(user.id) 
            ? <img src={likeFillIcon} alt="likeFill" />
            : <img src={likeIcon} alt="like" />
          }
          <p className={cls.feedback__counter}>{likeUserIds.length}</p>
        </div>
        <div className={cls.feedback__verticalLine}></div>
        <div className={cls.feedback} onClick={handleClickDislike}>
          {user && dislikeUserIds.includes(user.id) 
            ? <img src={dislikeFillIcon} alt="dislikeFill" />
            : <img src={dislikeIcon} alt="dislike" />
          }
          <p className={cls.feedback__counter}>{dislikeUserIds.length}</p>
        </div>
      </div>
      {isAuthorized &&
        <>
        <div className={cls.controls__favorite} onClick={handleClickFavorite}>
          {post && favoritePosts.includes(post.id) 
            ? <img src={favoriteFillIcon} alt="favoriteFill" />
            : <img src={favoriteIcon} alt="favorite" />
          }
        </div>
        {post?.userId === user?.id &&
          <div className={cls.controls__manageContent}>
            <img src={pencilIcon} onClick={() => setModalUpdate(true)} alt="pencil" />
            <img src={basketIcon} onClick={() => setModalDelete(true)} alt="basket" />
          </div>
        }
        </>
      }
      {modalUpdate && 
        <ModalManage 
          id='post_update'
          obj={post!} 
          type='post'
          action='update' 
          closeModal={() => setModalUpdate(false)}
        />
      }
      {modalDelete && <ModalConfirm action='delete_post' clickApply={handleDelete} closeModal={() => setModalDelete(false)} />}
    </div>
  )
}
