import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearForumMessages, getPosts } from 'src/redux/slices';
import { getForumSelector, getUserSelector } from 'src/redux/selectors';
import { Notification } from 'src/UI';
import { PageTemplate } from 'src/pages'
import { ListOfPosts } from 'src/components';
import cls from './styles.module.scss';

export const FavoritePostsPage = () => {
  const dispatch = useDispatch();
  const { favoritePosts } = useSelector(getUserSelector);
  const { posts, errorMessage } = useSelector(getForumSelector);
  const displayedPosts = posts.filter((post) => favoritePosts.includes(post.id))

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  const clearMessages = () => dispatch(clearForumMessages());

  return (
    <PageTemplate showScroll>
      <div className={cls.favoritePosts}>
        <h1 className={cls.favoritePosts__title}>Любимые посты</h1>
        <ListOfPosts 
          posts={displayedPosts} 
          emptyText='Список любимых постов пуст' 
        />
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}

