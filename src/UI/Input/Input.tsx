import React, { FC } from 'react'
import { warningIcon } from 'src/assets';
import { IInput } from 'src/interfaces';
import cn from 'classnames';
import cls from './styles.module.scss';

export const Input:FC<IInput> = ({id, register, type, title, placeholder, disabled, error, classNameInput}) => {
  const inputStyle = cn({
    [cls[classNameInput!]]: classNameInput,
    [cls.warning]: error,
  });
  
  return (
    <div className={cls.inputBlock}>
      {title &&
        <p className={cls.inputBlock__title}>{title}</p>
      }
      <input 
        id={id}
        {...register(id)}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={inputStyle}
      />
      {error &&
        <p className={cls.error}>
          <img src={warningIcon} alt="warning" />
          <span>{error}</span>
        </p>
      }
    </div>
  )
}
