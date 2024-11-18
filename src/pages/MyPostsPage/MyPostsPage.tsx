import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts } from 'src/redux/slices';
import { getLocalPostsSelector, getPostsSelector, getUserSelector } from 'src/redux/selectors';
import { PageTemplate } from 'src/pages'
import { ListOfPosts, ModalManage } from 'src/components';
import cls from './styles.module.scss';

export const MyPostsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserSelector);
  const { myPosts } = useSelector(getPostsSelector);
  const localPosts = useSelector(getLocalPostsSelector);

  // новые посты хранятся и обновляются отдельно в localState
  const allPosts = [...localPosts, ...myPosts];
  const [modalAdd, setModalAdd] = useState(false);

  useEffect(() => {
    dispatch(getMyPosts(user.id));
  }, [dispatch])

  return (
    <PageTemplate showScroll showPostsMessages>
      <div className={cls.myPosts}>
        <div className={cls.myPosts__top}>
          <h1 className={cls.myPosts__title}>Мои посты</h1>
          <button className='btnSmall' onClick={() => setModalAdd(true)}>Написать пост</button>
        </div>
        <ListOfPosts 
          posts={allPosts} 
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
    </PageTemplate>
  )
}

