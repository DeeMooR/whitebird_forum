import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { accountIcon, favoriteWhiteIcon, myPostsIcon } from 'src/assets';
import { getUserSelector } from 'src/redux/selectors';
import { ROLES } from 'src/config';
import cn from 'classnames';
import cls from './styles.module.scss';

export const HeaderButtons = () => {
  const navigate = useNavigate();
  const { role } = useSelector(getUserSelector);
  
  const btnSignInStyle = cn('btnBorder', 'btnSmall', cls.headerButtons__btnSignIn);
  
  return (
    <div className={cls.headerButtons}>
      {role === ROLES.UNAUTHORIZED ? (
        <button type='button' className={btnSignInStyle} onClick={() => navigate('/sign-in')}>Войти</button>
      ) : (
        <>
          <img src={favoriteWhiteIcon} onClick={() => navigate('/favorites')} alt="favourite" />
          <img src={myPostsIcon} className={cls.btnMyPosts} onClick={() => navigate('/myPosts')} alt="myPosts" />
          <img src={accountIcon} onClick={() => navigate('/account')} alt="account" />
        </>
      )}
    </div>
  )
}