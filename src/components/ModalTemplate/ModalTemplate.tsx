import React, { FC, ReactNode, useEffect } from 'react'
import { displayScroll, hiddenScroll } from './config';
import { crossIcon } from 'src/assets';
import cn from 'classnames';
import cls from './styles.module.scss';

interface IModalTemplate {
  closeModal: () => void,
  children: ReactNode,
  className?: string,
}

export const ModalTemplate:FC<IModalTemplate> = ({ closeModal, children, className = '' }) => {
  useEffect(() => {
    const scrollType = hiddenScroll();
    return () => displayScroll(scrollType);
  }, []);

  const clickBackground = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeModal();
  };

  const modalStyle = cn(cls.modal, {
    [cls[className!]]: className,
  });

  return (
    <div className={cls.modal__background} onClick={(e) => clickBackground(e)}>
      <div className={modalStyle}>
        <div className={cls.modal__content}>
          <img src={crossIcon} className={cls.modal__cross} onClick={closeModal} alt="cross" />
          {children}
        </div>
      </div>
    </div>
  )
}
