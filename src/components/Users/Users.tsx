import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteUserByAdmin } from 'src/redux/slices';
import { basketIcon, pencilIcon } from 'src/assets';
import { ModalConfirm, ModalManage } from 'src/components';
import { IUser } from 'src/interfaces'
import cn from 'classnames';
import cls from './styles.module.scss';

interface IUsers {
  users: IUser[],
}

export const Users:FC<IUsers> = ({ users }) => {
  const dispatch = useDispatch();
  const [modalChange, setModalChange] = useState<IUser | null>(null);
  const [modalDelete, setModalDelete] = useState<number | null>(null);

  const deleteUser = () => {
    dispatch(deleteUserByAdmin(modalDelete));
  }

  return (
    <div className={cls.users}>
      {!!users.length ? (
        <div className={cls.users__table}>
          <div className={cn(cls.table__line, cls.table__header)}>
            <p>Никнейм</p>
            <p>Имя</p>
            <p>Почта</p>
          </div>
          {users.map((user) => (
            <div className={cn(cls.table__line, cls.table__row)} key={user.id}>
              <p>{user.username}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <img src={pencilIcon} className={cls.btnPencil} onClick={() => setModalChange(user)} alt="pencil" />
              <img src={basketIcon} className={cls.btnBasket} onClick={() => setModalDelete(user.id)} alt="basket" />
            </div>
          ))}
        </div>
      ) : (
        <p className={cls.users__empty}>По выбранным критериям пользователей не найдено</p>
      )}
      {modalChange && 
        <ModalManage 
          id='users_update' 
          defaultObj={modalChange} 
          type='user'
          action='update' 
          closeModal={() => setModalChange(null)} 
        />
      }
      {modalDelete && <ModalConfirm action='delete_user' clickApply={deleteUser} closeModal={() => setModalDelete(null)} />}
    </div>
  )
}