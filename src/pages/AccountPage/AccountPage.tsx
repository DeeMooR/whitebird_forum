import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from 'src/redux/selectors';
import { clearUserMessages, deleteUser, logout, updateUser } from 'src/redux/slices';
import { ModalConfirm } from 'src/components';
import { PageTemplate } from 'src/pages';
import { IFullUser } from 'src/interfaces';
import { Input, Loading, Notification } from 'src/UI';
import { accountInputs, checkEmptyValues } from 'src/config';
import cn from 'classnames';
import cls from './styles.module.scss';
import { IAccountForm, convertUser, fieldsToCheck, getDefaultUser } from './config';

export const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role, isLoading, errorMessage } = useSelector(getUserSelector);
  const [modalDelete, setModalDelete] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
  } = useForm<IAccountForm>({
    mode: 'onChange',
    defaultValues: getDefaultUser(user)
  });

  useEffect(() => {
    if (role === 'unauthorized') navigate('/forum');
  }, [role])

  const handleUpdate = (data: IAccountForm) => {
    const isCorrect = checkEmptyValues(data, fieldsToCheck, setError);
    if (!isCorrect) return;
    const updatedUser = convertUser(data, user.id!);
    dispatch(updateUser(updatedUser));
  }

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
    setModalDelete(false);
  }

  const handleExit = () => {
    dispatch(logout());
  }

  const clearMessages = () => dispatch(clearUserMessages());

  return (
    <PageTemplate>
      <div className={cls.account}>
        <h1 className={cls.account__title}>Личный кабинет</h1>
        {role === 'admin' &&
          <button className={cn(cls.account__users, 'btnSmall')} onClick={() => navigate('/users')}>Все пользователи</button>
        }
        <div className={cls.account__content}>
          {isLoading ? (
            <Loading />
          ) : (
            <form className={cls.account__form} onSubmit={handleSubmit(handleUpdate)}>
              <h3 className={cls.account__subtitle}>Основные данные</h3>
              <div className={cls.account__fields}>
                {accountInputs.main.map(({id, type, title, placeholder}) => (
                  <div className={cls.account__field} key={id}>
                    <Input
                      id={id}
                      register={register}
                      type={type}
                      title={title}
                      placeholder={placeholder}
                      error={errors[id as keyof typeof errors]?.message}
                    />
                  </div>
                ))}
              </div>
              <h3 className={cls.account__subtitle}>Адрес</h3>
              <div className={cls.account__fields}>
                {accountInputs.address.map(({id, type, title, placeholder}) => (
                  <div className={cls.account__field} key={id}>
                    <Input
                      id={id}
                      register={register}
                      type={type}
                      title={title}
                      placeholder={placeholder}
                      error={errors[id as keyof typeof errors]?.message}
                    />
                  </div>
                ))}
              </div>
              <div className={cls.account__buttons}>
                <div className={cls.account__сontrols}>
                  <button type='button' className={cn(cls.account__btnDelete, 'btnSmall', 'btnDelete')} onClick={() => setModalDelete(true)}>Удалить</button>
                  <button type='submit' className={cn(cls.account__btnUpdate, 'btnSmall')} disabled={!isDirty}>Изменить</button>
                </div>
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