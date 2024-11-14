import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearForumMessages, getPosts } from 'src/redux/slices';
import { getForumSelector } from 'src/redux/selectors';
import { Card, ForumSearch } from 'src/components';
import { PageTemplate } from 'src/pages'
import { Loading, Notification } from 'src/UI'
import cls from './styles.module.scss';
import { STEP_POSTS } from 'src/config';

export const ForumPage = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, errorMessage } = useSelector(getForumSelector);
  const [limit, setLimit] = useState(STEP_POSTS)

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  const handleShowMore = () => {
    setLimit((prev) => prev + STEP_POSTS)
  }

  const clearMessages = () => dispatch(clearForumMessages());

  return (
    <PageTemplate notShowCrumbs>
      <div className={cls.forumPage}>
        <h1 className={cls.forumPage__title}>Все статьи</h1>
        <div className={cls.forumPage__search}>
          <ForumSearch />
        </div>
        {isLoading ? (
          <div className={cls.forumPage__loading}>
            <Loading />
          </div>
        ) : (
          <>
            <div className={cls.forumPage__posts}>
              {posts.slice(0, limit).map((post) => (
                <Card post={post} key={post.id} />
              ))}
            </div>
            {limit < posts.length &&
              <button className={cls.forumPage__btnShowMore} onClick={handleShowMore}>Показать ещё</button>
            }
          </>
        )}
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}
