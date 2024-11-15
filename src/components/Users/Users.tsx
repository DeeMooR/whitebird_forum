import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteUserByAdmin } from 'src/redux/slices';
import { basketIcon, pencilIcon } from 'src/assets';
import { ModalConfirm } from 'src/components';
import { IUser } from 'src/interfaces'
import cn from 'classnames';
import cls from './styles.module.scss';

interface IUsers {
  users: IUser[],
}

export const Users:FC<IUsers> = ({ users }) => {
  const dispatch = useDispatch();
  const [modalChange, setModalChange] = useState<number | null>(null);
  const [modalDelete, setModalDelete] = useState<number | null>(null);

  const changeUser = () => {}

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
          {users.map(({id, username, name, email}) => (
            <div className={cn(cls.table__line, cls.table__row)} key={id}>
              <p>{username}</p>
              <p>{name}</p>
              <p>{email}</p>
              <img src={pencilIcon} className={cls.btnPencil} onClick={() => setModalChange(id)} alt="pencil" />
              <img src={basketIcon} className={cls.btnBasket} onClick={() => setModalDelete(id)} alt="basket" />
            </div>
          ))}
        </div>
      ) : (
        <p className={cls.users__empty}>По выбранным критериям пользователей не найдено</p>
      )}
      {modalDelete && <ModalConfirm action='delete_user' clickApply={deleteUser} closeModal={() => setModalDelete(null)} />}
    </div>
  )
}