import React, { FC, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from 'src/redux/selectors';
import { clearUserMessages } from 'src/redux/slices';
import { Footer, Header, PostsMessages } from 'src/components';
import { Notification } from 'src/UI';
import cn from 'classnames';
import cls from './styles.module.scss';

interface IPageTemplate {
  children: ReactNode;
  isCenter?: boolean;
  notShowCrumbs?: boolean;
  showScroll?: boolean;
  showPostsMessages?: boolean;
}

export const PageTemplate:FC<IPageTemplate> = ({ children, isCenter, notShowCrumbs, showScroll, showPostsMessages }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successMessage: userSuccessMessage } = useSelector(getUserSelector);

  useEffect(() => {
    if (showScroll) {
      document.body.style.overflowY = "scroll";
      return () => {document.body.style.overflowY = "auto"};
    }
  }, []);

  const clearMessages = () => dispatch(clearUserMessages());
  
  const wrapperStyle = cn('wrapper', cls.pageTemplate__wrapper);
  const contentStyle = cn(cls.pageTemplate__content, {
    [cls.isCenter]: isCenter,
  });

  return (
    <div className={cls.pageTemplate}>
      <Header />
      <div className={wrapperStyle}>
        {!notShowCrumbs && 
          <p className={cls.pageTemplate__crumbs} onClick={() => navigate('/forum')}>Форум /</p>
        }
        <div className={contentStyle}>
          {children}
        </div>
      </div>
      <Footer />
      {userSuccessMessage && <Notification type='success' message={userSuccessMessage} clearMessage={clearMessages} />}
      {showPostsMessages && <PostsMessages />}
    </div>
  )
}