import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearPostsMessages, getMyPosts } from 'src/redux/slices';
import { getPostsSelector, getUserSelector } from 'src/redux/selectors';
import { Notification } from 'src/UI';
import { PageTemplate } from 'src/pages'
import { ListOfPosts } from 'src/components';
import cls from './styles.module.scss';

export const MyPostsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserSelector);
  const { myPosts, errorMessage } = useSelector(getPostsSelector);

  useEffect(() => {
    console.log(user.id)
    dispatch(getMyPosts(user.id));
  }, [dispatch])
  
  const handleAddPost = () => {
    console.log('addPost')
  }

  const clearMessages = () => dispatch(clearPostsMessages());

  return (
    <PageTemplate showScroll>
      <div className={cls.myPosts}>
        <div className={cls.myPosts__top}>
          <h1 className={cls.myPosts__title}>Мои посты</h1>
          <button className='btnSmall' onClick={handleAddPost}>Написать пост</button>
        </div>
        <ListOfPosts 
          posts={myPosts} 
          emptyText='Ваш список постов пуст' 
          showControls
        />
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}

