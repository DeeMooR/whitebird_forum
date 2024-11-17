import React, { FC, useState } from 'react'
import { getUserSelector } from 'src/redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from 'src/redux/slices';
import { basketIcon, pencilIcon, userPhoto2Image } from 'src/assets';
import { ModalConfirm, ModalManage } from 'src/components';
import { IComment } from 'src/interfaces'
import cls from './styles.module.scss';

interface ICommentBlock {
  obj: IComment
}

export const Comment:FC<ICommentBlock> = ({ obj }) => {
  const dispatch = useDispatch();
  const { id, name, email, body, postId } = obj;
  const { user } = useSelector(getUserSelector);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  
  const handleDelete = () => {
    dispatch(deleteComment(id));
    setModalDelete(false);
  }

  return (
    <div className={cls.comment}>
      <div className={cls.comment__author}>
        <img src={userPhoto2Image} className={cls.comment__photo} alt="user" />
        <p className={cls.comment__email}>{email}</p>
        {email === user.email &&
          <div className={cls.comment__controls}>
            <img src={pencilIcon} onClick={() => setModalUpdate(true)} alt="pencil" />
            <img src={basketIcon} onClick={() => setModalDelete(true)} alt="basket" />
          </div>
        }
      </div>
      <div className={cls.comment__info}>
        <p className={cls.comment__title}>{name}</p>
        <p className={cls.comment__body}>{body}</p>
      </div>
      {modalUpdate && 
        <ModalManage 
          id='comment_update'
          obj={obj} 
          type='comment'
          action='update' 
          closeModal={() => setModalUpdate(false)} 
        />
      }
      {modalDelete && <ModalConfirm action='delete_comment' clickApply={handleDelete} closeModal={() => setModalDelete(false)} />}
    </div>
  )
}