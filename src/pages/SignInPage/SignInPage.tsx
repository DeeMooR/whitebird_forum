import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from 'src/redux/selectors';
import { clearUserMessages, signIn } from 'src/redux/slices';
import { PageTemplate } from 'src/pages';
import { ISignIn } from 'src/interfaces';
import { Input, Loading, Notification } from 'src/UI';
import cls from './styles.module.scss';

export const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, isLoading, errorMessage } = useSelector(getUserSelector);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ISignIn>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (role !== 'unauthorized') navigate('/forum');
  }, [role])

  const onSubmit = (data: ISignIn) => {
    if (!data.email) {
      setError("email", { message: 'Обязательное поле' });
      return;
    }
    dispatch(signIn(data.email));
  }

  const clearMessages = () => dispatch(clearUserMessages());

  return (
    <PageTemplate isCenter>
      <div className={cls.signIn}>
        <h1 className={cls.signIn__title}>Вход в личный кабинет</h1>
        <div className={cls.signIn__content}>
          {isLoading ? (
            <Loading />
          ) : (
            <form className={cls.signIn__form} onSubmit={handleSubmit(onSubmit)}>
              <div className={cls.signIn__fields}>
                <Input
                  id='email'
                  register={register}
                  type="email"
                  placeholder='yourmail@mail.com'
                  error={errors.email?.message}
                />
              </div>
              <button type='submit' className={cls.signIn__btnSend}>Войти</button>
            </form>
          )}
        </div>
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}