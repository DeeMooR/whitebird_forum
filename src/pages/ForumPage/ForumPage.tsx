import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearForumMessages, getPosts } from 'src/redux/slices';
import { getForumSelector } from 'src/redux/selectors';
import { Card } from 'src/components';
import { PageTemplate } from 'src/pages'
import { Loading, Notification } from 'src/UI'
import cls from './styles.module.scss';

export const ForumPage = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, errorMessage } = useSelector(getForumSelector);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  const clearMessages = () => dispatch(clearForumMessages());

  return (
    <PageTemplate notShowCrumbs>
      <div className={cls.forumPage}>
        <h1 className={cls.forumPage__title}>Все статьи</h1>
        <div className={cls.forumPage__posts}>
          {isLoading ? (
            <Loading />
          ) : (
            posts.map((post) => (
              <Card post={post} key={post.id} />
            ))
          )}
        </div>
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}
