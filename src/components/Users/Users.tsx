import React, { FC } from 'react'
import { IUser } from 'src/interfaces'
import { basketIcon, pencilIcon } from 'src/assets';
import cn from 'classnames';
import cls from './styles.module.scss';

interface IUsers {
  users: IUser[],
}

export const Users:FC<IUsers> = ({ users }) => {

  const handleChange = (id: number) => {}

  const handleDelete = (id: number) => {}

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
              <img src={pencilIcon} className={cls.btnPencil} onClick={() => handleChange(id)} alt="pencil" />
              <img src={basketIcon} className={cls.btnBasket} onClick={() => handleDelete(id)} alt="basket" />
            </div>
          ))}
        </div>
      ) : (
        <p className={cls.users__empty}>По выбранным критериям пользователей не найдено</p>
      )}
    </div>
  )
}