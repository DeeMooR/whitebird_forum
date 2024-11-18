import React, { FC } from 'react'
import { useDispatch } from 'react-redux';
import { setSwapPosts } from 'src/redux/slices';
import { arrowDownIcon, arrowUpIcon } from 'src/assets';
import cn from 'classnames';
import cls from './styles.module.scss';

interface IPostMoving {
  postId: number,
  movingPostsId: {
    upPostId: number | null,
    downPostId: number | null,
  }
}

export const PostMoving:FC<IPostMoving> = ({ postId, movingPostsId }) => {
  const dispatch = useDispatch();
  
  const handleSwapWithUp = () => {
    dispatch(setSwapPosts([postId, movingPostsId?.upPostId]));
  }
  const handleSwapWithDown = () => {
    dispatch(setSwapPosts([postId, movingPostsId?.downPostId]));
  }

  const btnUpStyle = cn(cls.card__btnUp, { 
    [cls.isDisabled]: !movingPostsId?.upPostId,
  });
  const btnDownStyle = cn(cls.card__btnUp, { 
    [cls.isDisabled]: !movingPostsId?.downPostId,
  });

  return (
    <div className={cls.postMoving}>
      <img src={arrowUpIcon} className={btnUpStyle} onClick={handleSwapWithUp} alt="arrowUp" />
      <img src={arrowDownIcon} className={btnDownStyle} onClick={handleSwapWithDown} alt="arrowDown" />
    </div>
  )
}
