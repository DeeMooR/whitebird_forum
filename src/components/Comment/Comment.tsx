import React, { FC } from 'react'
import { IComment } from 'src/interfaces'
import cls from './styles.module.scss';
import { userPhoto2Image } from 'src/assets';

interface ICommentBlock {
  obj: IComment
}

export const Comment:FC<ICommentBlock> = ({ obj }) => {
  const { id, name, email, body, postId } = obj;

  return (
    <div className={cls.comment}>
      <div className={cls.comment__author}>
        <img src={userPhoto2Image} alt="user" />
        <p className={cls.comment__email}>{email}</p>
      </div>
      <div className={cls.comment__info}>
        <p className={cls.comment__title}>{name}</p>
        <p className={cls.comment__body}>{body}</p>
      </div>
    </div>
  )
}