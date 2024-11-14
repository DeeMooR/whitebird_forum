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

export const Notification:FC<INotification> = ({type, message, displayTime = 3500, clearMessage}) => {
  const { icon, style } = NotificationData[type];
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(closeModal, displayTime);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    if (clearMessage) clearMessage();
  }

  const notificationStyle = cn(cls.notification, cls[style]);

  return !isVisible ? null : (
    <div className={notificationStyle}>
      <div className={cls.notification__wrapper}>
        <div className={cls.notification__icon}>{icon}</div>
        <p className={cls.notification__text}>{message}</p>
        <div className={cls.notification__cross} onClick={closeModal}>
          <img src={crossIcon} alt="close" />
        </div>
      </div>
    </div>
  )
}
