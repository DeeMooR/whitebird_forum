import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearPostsMessages, getMyPosts } from 'src/redux/slices';
import { getPostsSelector, getUserSelector } from 'src/redux/selectors';
import { Notification } from 'src/UI';
import { PageTemplate } from 'src/pages'
import { ListOfPosts, ModalManage } from 'src/components';
import cls from './styles.module.scss';

export const MyPostsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserSelector);
  const { myPosts, errorMessage } = useSelector(getPostsSelector);
  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts(user.id));
  }, [dispatch])

  const clearMessages = () => dispatch(clearPostsMessages());

  return (
    <PageTemplate showScroll>
      <div className={cls.myPosts}>
        <div className={cls.myPosts__top}>
          <h1 className={cls.myPosts__title}>Мои посты</h1>
          <button className='btnSmall' onClick={() => setModalAdd(true)}>Написать пост</button>
        </div>
        <ListOfPosts 
          posts={myPosts} 
          emptyText='Ваш список постов пуст' 
          showControls
        />
      </div>
      {modalAdd && 
        <ModalManage 
          id='posts_add' 
          type='post'
          action='add'
          closeModal={() => setModalAdd(false)} 
        />
      }
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}

