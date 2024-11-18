import React from 'react'
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getUserSelector } from 'src/redux/selectors';
import { HeaderButtons } from 'src/components';
import { logoIcon, logoShortIcon } from 'src/assets'
import cls from './styles.module.scss';

export const Header = () => {
  const navigate = useNavigate();
  const { role } = useSelector(getUserSelector);

  const headerWrapperStyle = cn('wrapper', cls.header__wrapper);

  return (
    <header className={cls.header}>
      <div className={headerWrapperStyle}>
        <picture className={cls.header__logo} onClick={() => navigate('/forum')}>
          <source srcSet={logoShortIcon} media="(max-width: 800px)" />
          <img src={logoIcon} alt="WHITEBIRD" />
        </picture>
        <div className={cls.header__navigation}>
          <Link to='/forum'>Форум</Link>
          {role === 'admin' && 
            <Link to='/users'>Пользователи</Link>
          }
        </div>
        <HeaderButtons />
      </div>
    </header>
  )
}
