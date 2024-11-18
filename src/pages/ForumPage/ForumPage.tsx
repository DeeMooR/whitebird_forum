import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, setPostsSearch } from 'src/redux/slices';
import { getPostsSelector, getUserSelector } from 'src/redux/selectors';
import { ListOfPosts, Search } from 'src/components';
import { PageTemplate } from 'src/pages'
import { ROLES } from 'src/config';
import cls from './styles.module.scss';

export const ForumPage = () => {
  const dispatch = useDispatch();
  const { role } = useSelector(getUserSelector);
  const { posts, search } = useSelector(getPostsSelector);
  const showPriority = !search && role === ROLES.ADMIN;

  useEffect(() => {
    dispatch(getPosts());
    return () => {dispatch(setPostsSearch(null))};
  }, [dispatch]);

  const sortPosts = () => {
    return [...posts].sort((l, r) => r.priority! - l.priority!);
  }

  return (
    <PageTemplate notShowCrumbs showScroll showPostsMessages>
      <div className={cls.forumPage}>
        <h1 className={cls.forumPage__title}>Все статьи</h1>
        <div className={cls.forumPage__search}>
          <Search data='posts' />
        </div>
        {showPriority &&
          <div className={cls.forumPage__listHeader}>
            <p className={cls.listHeader__priority}>Приоритет</p>
            <p className={cls.listHeader__moving}>Передвижение</p>
          </div>
        }
        <ListOfPosts 
          posts={sortPosts()}
          emptyText='По выбранным критериям постов не найдено' 
          withLimit
          showPriority={showPriority}
        />
      </div>
    </PageTemplate>
  )
}
