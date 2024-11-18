import React, { FC, useEffect, useState } from 'react'
import { crossIcon } from 'src/assets'
import { NotificationData } from './config';
import cn from 'classnames';
import cls from './styles.module.scss';

interface INotification {
  type: 'error' | 'success',
  message: string,
  displayTime?: number,
  clearMessage?: () => void,
}

export const Notification:FC<INotification> = ({type, message, displayTime = 3000, clearMessage}) => {
  const { icon, style } = NotificationData[type];
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // чтобы сработал transition
    const showModal = async () => {
      await setIsVisible(true);
      await setIsRendered(true);
    }
    showModal();
    const timer = setTimeout(closeModal, displayTime);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    if (clearMessage) clearMessage();
  }

  const notificationStyle = cn(cls.notification, cls[style], {
    [cls.isOpen]: isRendered,
  });

  return isVisible ? (
    <div className={notificationStyle}>
      <div className={cls.notification__wrapper}>
        <div className={cls.notification__icon}>{icon}</div>
        <p className={cls.notification__text}>{message}</p>
        <div className={cls.notification__cross} onClick={closeModal}>
          <img src={crossIcon} alt="close" />
        </div>
      </div>
    </div>
  ): null;
}
