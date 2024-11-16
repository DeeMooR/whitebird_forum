import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearPostsMessages, getPosts } from 'src/redux/slices';
import { getPostsSelector } from 'src/redux/selectors';
import { ListOfPosts, Search } from 'src/components';
import { PageTemplate } from 'src/pages'
import { Notification } from 'src/UI'
import cls from './styles.module.scss';

export const ForumPage = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, errorMessage } = useSelector(getPostsSelector);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  const clearMessages = () => dispatch(clearPostsMessages());

  return (
    <PageTemplate notShowCrumbs showScroll>
      <div className={cls.forumPage}>
        <h1 className={cls.forumPage__title}>Все статьи</h1>
        <div className={cls.forumPage__search}>
          <Search data='posts' />
        </div>
        <ListOfPosts 
          posts={posts}
          emptyText='По выбранным критериям постов не найдено' 
          withLimit
        />
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}
