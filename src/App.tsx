import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { getUserSelector } from './redux/selectors';
import { clearUserFavoritePosts, setUserFavoritePosts, signIn, setUserRole, clearLocalState } from './redux/slices';
import { AccountPage, ForumPage, SignInPage, UsersPage, FavoritePostsPage, MyPostsPage, PostPage }  from './pages';

const App = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector(getUserSelector);

  useLayoutEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const login = async () => {
      if (userEmail) await dispatch(signIn(userEmail));
      else dispatch(setUserRole('unauthorized'));
    }
    login();
  }, [])

  useEffect(() => {
    if (user.id) dispatch(setUserFavoritePosts());
    else {
      dispatch(clearUserFavoritePosts());
      dispatch(clearLocalState());
    }
  }, [user])

  return role ? (
    <>
    <Routes>
      <Route path='/forum' element={<ForumPage />} />
      <Route path='/forum/:id' element={<PostPage />} />
      {role === 'unauthorized' &&
        <Route path='/sign-in' element={<SignInPage />} />
      }
      {role !== 'unauthorized' &&
        <>
        <Route path='/favorites' element={<FavoritePostsPage />} />
        <Route path='/myPosts' element={<MyPostsPage />} />
        <Route path='/account' element={<AccountPage />} />
        </>
      }
      {role === 'admin' &&
        <Route path='/users' element={<UsersPage />} />
      }
      <Route path='*' element={<Navigate to="/forum" />} />
    </Routes>
    </>
  ) : null;
}

export default App;
