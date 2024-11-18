import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getControlsInPostSelector, getPostSelector, getUserSelector } from 'src/redux/selectors';
import { deleteLocalPost, deletePostInPostPage, updatePostDislikes, updatePostLikes, updateUserFavoritePosts } from 'src/redux/slices';
import { basketIcon, dislikeFillIcon, dislikeIcon, favoriteFillIcon, favoriteIcon, likeFillIcon, likeIcon, pencilIcon } from 'src/assets';
import { ModalConfirm, ModalManage } from 'src/components';
import { ROLES } from 'src/config';
import cn from 'classnames';
import cls from './styles.module.scss';

export const PostControls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post} = useSelector(getPostSelector);
  const { favoritePosts, user, role } = useSelector(getUserSelector);
  const { likeUserIds, dislikeUserIds } = useSelector(getControlsInPostSelector);
  const isAuthorized = role !== ROLES.UNAUTHORIZED;

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
    // новые посты отдельно изменяются в localState 
    const func = (post && post?.id > 100) 
      ? deleteLocalPost({postId: post?.id, navigate}) 
      : deletePostInPostPage({id: post?.id, navigate});
    dispatch(func);
  }

  const feedbackStyle = cn(cls.feedback, {
    [cls.isDisabled]: !isAuthorized
  })
  
  return (
    <div className={cls.controls}>
      <div className={cls.controls__feedback}>
        <div className={feedbackStyle} onClick={handleClickLike}>
          {user.id && likeUserIds.includes(user.id) 
            ? <img src={likeFillIcon} alt="likeFill" />
            : <img src={likeIcon} alt="like" />
          }
          <p className={cls.feedback__counter}>{likeUserIds.length}</p>
        </div>
        <div className={cls.feedback__verticalLine}></div>
        <div className={feedbackStyle} onClick={handleClickDislike}>
          {user.id && dislikeUserIds.includes(user.id) 
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
          id={(post && post?.id > 100) ? 'localPosts_update' : 'post_update'}
          defaultObj={post!} 
          type='post'
          action='update' 
          closeModal={() => setModalUpdate(false)}
        />
      }
      {modalDelete && <ModalConfirm action='delete_post' clickApply={handleDelete} closeModal={() => setModalDelete(false)} />}
    </div>
  )
}
