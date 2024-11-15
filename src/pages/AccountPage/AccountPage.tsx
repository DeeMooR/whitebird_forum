import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from 'src/redux/selectors';
import { clearUserMessages, deleteUser, logout, signIn, updateUser } from 'src/redux/slices';
import { PageTemplate } from 'src/pages';
import { IFullUser } from 'src/interfaces';
import { Input, Loading, Notification } from 'src/UI';
import { accountInputs } from 'src/config';
import cn from 'classnames';
import cls from './styles.module.scss';
import { ModalConfirm } from 'src/components';

export const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role, isLoading, errorMessage } = useSelector(getUserSelector);
  const [modalDelete, setModalDelete] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFullUser>({
    mode: 'onChange',
    defaultValues: user
  });

  useEffect(() => {
    if (role === 'unauthorized') navigate('/forum');
  }, [role])

  const handleUpdate = (data: IFullUser) => {
    dispatch(updateUser(data));
  }

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  }

  const handleExit = () => {
    dispatch(logout());
  }

  const clearMessages = () => dispatch(clearUserMessages());

  return (
    <PageTemplate>
      <div className={cls.account}>
        <h1 className={cls.account__title}>Личный кабинет</h1>
        <div className={cls.account__content}>
          {isLoading ? (
            <Loading />
          ) : (
            <form className={cls.account__form} onSubmit={handleSubmit(handleUpdate)}>
              <h3 className={cls.account__subtitle}>Основные данные</h3>
              <div className={cls.account__fields}>
                {accountInputs.main.map((data) => (
                  <div className={cls.account__field} key={data.id}>
                    <Input
                      id={data.id}
                      register={register}
                      type={data.type}
                      title={data.title}
                      placeholder={data.placeholder}
                    />
                  </div>
                ))}
              </div>
              <h3 className={cls.account__subtitle}>Адрес</h3>
              <div className={cls.account__fields}>
                {accountInputs.address.map((data) => (
                  <div className={cls.account__field} key={data.id}>
                    <Input
                      id={data.id}
                      register={register}
                      type={data.type}
                      title={data.title}
                      placeholder={data.placeholder}
                    />
                  </div>
                ))}
              </div>
              <div className={cls.account__buttons}>
                <button type='button' className={cn(cls.account__btnDelete, 'btnSmall', 'btnDelete')} onClick={() => setModalDelete(true)}>Удалить</button>
                <button type='button' className={cn(cls.account__btnUpdate, 'btnSmall')} disabled={!isDirty}>Изменить</button>
                <button type='button' className={cn(cls.account__btnExit, 'btnSmall')} onClick={handleExit}>Выйти</button>
              </div>
            </form>
          )}
        </div>
      </div>
      {modalDelete && <ModalConfirm action='delete_account' clickApply={handleDelete} closeModal={() => setModalDelete(false)} />}
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}