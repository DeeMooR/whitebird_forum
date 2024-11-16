import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearForumMessages, getMyPosts } from 'src/redux/slices';
import { getForumSelector, getUserSelector } from 'src/redux/selectors';
import { Notification } from 'src/UI';
import { PageTemplate } from 'src/pages'
import { ListOfPosts } from 'src/components';
import cn from 'classnames';
import cls from './styles.module.scss';

export const MyPostsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserSelector);
  const { myPosts, errorMessage } = useSelector(getForumSelector);

  useEffect(() => {
    dispatch(getMyPosts(user.id));
  }, [dispatch])
  
  const handleAddPost = () => {
    console.log('addPost')
  }

  const clearMessages = () => dispatch(clearForumMessages());

  return (
    <PageTemplate showScroll>
      <div className={cls.myPosts}>
        <div className={cls.myPosts__top}>
          <h1 className={cls.myPosts__title}>Мои посты</h1>
          <button className={cn(cls.myPosts__btnAdd, 'btnSmall')} onClick={handleAddPost}>Написать пост</button>
        </div>
        <ListOfPosts 
          posts={myPosts} 
          emptyText='Ваш список постов пуст' 
        />
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}

