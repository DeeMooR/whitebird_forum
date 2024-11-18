import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from 'src/redux/slices';
import { getLocalPostsSelector, getPostsSelector } from 'src/redux/selectors';
import { ListOfPosts, Search } from 'src/components';
import { PageTemplate } from 'src/pages'
import cls from './styles.module.scss';

export const ForumPage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(getPostsSelector);
  const localPosts = useSelector(getLocalPostsSelector);
  const allPosts = [...localPosts, ...posts];

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  return (
    <PageTemplate notShowCrumbs showScroll showPostsMessages>
      <div className={cls.forumPage}>
        <h1 className={cls.forumPage__title}>Все статьи</h1>
        <div className={cls.forumPage__search}>
          <Search data='posts' />
        </div>
        <ListOfPosts 
          posts={allPosts}
          emptyText='По выбранным критериям постов не найдено' 
          withLimit
        />
      </div>
    </PageTemplate>
  )
}
