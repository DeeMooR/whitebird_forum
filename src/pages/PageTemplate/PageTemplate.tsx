import React, { FC, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from 'src/redux/selectors';
import { clearUserMessages } from 'src/redux/slices';
import { Footer, Header } from 'src/components';
import { Notification } from 'src/UI';
import cn from 'classnames';
import cls from './styles.module.scss';

interface IPageTemplate {
  children: ReactNode;
  isCenter?: boolean;
}

export const PageTemplate:FC<IPageTemplate> = ({ children, isCenter }) => {
  const dispatch = useDispatch();
  const { successMessage } = useSelector(getUserSelector);

  const clearMessages = () => dispatch(clearUserMessages());
  
  const signInWrapperStyle = cn('wrapper', cls.pageTemplate__wrapper, {
    [cls.isCenter]: isCenter,
  });

  return (
    <div  className={cls.pageTemplate}>
      <Header />
      <div className={signInWrapperStyle}>
        {children}
      </div>
      <Footer />
      {successMessage && <Notification type='success' message={successMessage} clearMessage={clearMessages} />}
    </div>
  )
}