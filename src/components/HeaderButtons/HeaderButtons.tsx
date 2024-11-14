import React from 'react'
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { accountIcon, favoriteWhiteIcon } from 'src/assets';
import { getUserSelector } from 'src/redux/selectors';
import cls from './styles.module.scss';

export const HeaderButtons = () => {
  const navigate = useNavigate();
  const { role } = useSelector(getUserSelector);

  const handleClickSignIn = () => {
    navigate('/sign-in');
  }

  const handleClickFavorite = () => {
    navigate('/favorites');
  }

  const handleClickAccount = () => {
    navigate('/account');
  }
  
  const btnSignInStyle = cn('btnBorder', 'btnSmall', cls.headerButtons__btnSignIn);
  
  return (
    <div className={cls.headerButtons}>
      {role === 'unauthorized' ? (
        <button type='button' className={btnSignInStyle} onClick={handleClickSignIn}>Войти</button>
      ) : (
        <>
          <img src={favoriteWhiteIcon} onClick={handleClickFavorite} alt="favourite" />
          <img src={accountIcon} onClick={handleClickAccount} alt="account" />
        </>
      )}
    </div>
  )
}