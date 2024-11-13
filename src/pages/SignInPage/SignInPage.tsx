import React, { useEffect } from 'react'
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Footer, Header } from 'src/components';
import { getUserSelector } from 'src/redux/selectors';
import { signIn } from 'src/redux/slices';
import cls from './styles.module.scss';

export const SignInPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  useEffect(() => {
    dispatch(signIn('Shanna@melissa.t'));
  }, [dispatch]);

  const signInWrapperStyle = cn('wrapper', cls.signIn__wrapper);

  return (
    <div className={cls.signIn}>
      <Header />
      <div className={signInWrapperStyle}>
      </div>
      <Footer />
    </div>
  )
}