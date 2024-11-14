import React, { FC } from 'react'
import { UseFormRegister } from 'react-hook-form';
import { warningIcon } from 'src/assets';
import cls from './styles.module.scss';

interface IInput {
  id: string;
  register: UseFormRegister<any>;
  type: string;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

export const Input:FC<IInput> = ({id, register, type, title, placeholder, disabled, error}) => {
  const inputStyle = `${error ? cls.warning : ''}`;
  
  return (
    <div className={cls.inputBlock}>
      <p className={cls.inputBlock__title}>{title}</p>
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
