import React, { ChangeEvent, FC, useState } from 'react'
import { UseFormRegister } from 'react-hook-form';
import { warningIcon } from 'src/assets';
import cn from 'classnames';
import cls from './styles.module.scss';


interface ITextareaBlock {
  id: string;
  register: UseFormRegister<any>;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  max?: number,
  error?: string;
}

export const Textarea:FC<ITextareaBlock> = ({id, register, title, placeholder, disabled, max, error}) => {
  const [messageLength, setMessageLength] = useState(0);
  
  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const message = event.target.value;
    setMessageLength(message.length);
  };

  const textareaStyle = cn({
    [cls.warning]: error,
  });

  return (
    <div className={cls.textareaBlock}>
      {title &&
        <p className={cls.textareaBlock__title}>{title}</p>
      }
      <textarea 
        id={id}
        {...register(id)}
        maxLength={max}
        disabled={disabled}
        placeholder={placeholder}
        className={textareaStyle}
        onInput={handleMessageChange}
      />
      {max &&
        <div className={cls.textareaBlock__count}>
          {messageLength}/{max}
        </div>
      }
      {error &&
        <p className={cls.error}>
          <img src={warningIcon} alt="warning" />
          <span>{error}</span>
        </p>
      }
    </div>
  )
}
