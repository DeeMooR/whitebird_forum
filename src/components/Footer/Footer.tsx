import React from 'react'
import cn from 'classnames';
import cls from './styles.module.scss';

export const Footer = () => {
  const footerWrapperStyle = cn('wrapper', cls.footer__wrapper);

  return (
    <footer className={cls.footer}>
      <div className={footerWrapperStyle}>
        <p className={cls.footer__email}>info@whitebird.io</p>
        <p className={cls.footer__copyright}>© 2020–2024 Whitebird</p>
      </div>
    </footer>
  )
}
