import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updatePostPriority } from 'src/redux/slices';
import { arrowDownIcon, arrowUpIcon } from 'src/assets';
import cn from 'classnames';
import cls from './styles.module.scss';

interface IChangePriority {
  postId: number,
  defaultValue: number,
  isLocalPost?: boolean,
}

export const ChangePriority:FC<IChangePriority> = ({ postId, defaultValue, isLocalPost }) => {
  const dispatch = useDispatch();
  const [priority, setPriority] = useState(defaultValue);

  const handleClickUp = () => setPriority((prev) => prev < 10 ? ++prev : prev);
  const handleClickDown = () => setPriority((prev) => prev > 1 ? --prev : prev);

  useEffect(() => {
    dispatch(updatePostPriority({postId, priority}));
  }, [priority])
  
  const controlUpStyle = cn(cls.changePriority__contol, { [cls.hidden]: priority >= 10 });
  const controlDownStyle = cn(cls.changePriority__contol, { [cls.hidden]: priority <= 1 });

  return (
    <div className={cls.changePriority}>
      <img src={arrowUpIcon} className={controlUpStyle} onClick={handleClickUp} alt="arrowUp" />
      <input 
        type="number"
        value={priority} 
        className={cls.changePriority__input}
        disabled
      />
      <img src={arrowDownIcon} className={controlDownStyle} onClick={handleClickDown} alt="arrowDown" />
    </div>
  )
}