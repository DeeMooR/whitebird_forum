import React, { FC, useEffect, useState } from 'react'
import cls from './styles.module.scss';

interface ILoading {
  delay?: number,
}

export const Loading:FC<ILoading> = ({ delay = 0 }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsActive(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return isActive ? (
    <div className={cls.loading}>
      <div className={cls.loading__spinner} />
    </div>
  ) : null;
}
