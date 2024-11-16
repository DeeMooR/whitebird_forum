import React, { FC } from 'react'
import { ModalTemplate } from 'src/components';
import cls from './styles.module.scss';
import { IUser } from 'src/interfaces';
import { useForm } from 'react-hook-form';
import { Input } from 'src/UI';
import { useDispatch } from 'react-redux';
import { changeUserByAdmin } from 'src/redux/slices';

interface IModalChangeUser {
  user: IUser,
  closeModal: () => void
}

export const ModalChangeUser:FC<IModalChangeUser> = ({user, closeModal}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    mode: 'onChange',
    defaultValues: user
  });

  const onSubmit = (data: IUser) => {
    dispatch(changeUserByAdmin(data));
  }

  return (
    <ModalTemplate closeModal={closeModal}>
      <form className={cls.modalChangeUser} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={cls.modalChangeUser__title}>Изменить пользователя?</h3>
        <div className={cls.modalChangeUser__fields}>
          <Input
            id='username'
            register={register}
            type='text'
            title='Никнейм'
            placeholder='Никнейм'
          />
          <Input
            id='name'
            register={register}
            type='text'
            title='Имя'
            placeholder='Имя'
          />
          <Input
            id='email'
            register={register}
            type='email'
            title='Почта'
            placeholder='Почта'
          />
        </div>
        <div className={cls.modalChangeUser__buttons}>
          <button type='button' className={cls.btnCancel} onClick={closeModal}>Отмена</button>
          <button className={cls.btnChange}>Изменить</button>
        </div>
      </form>
    </ModalTemplate>
  )
}
