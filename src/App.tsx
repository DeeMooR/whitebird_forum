import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AccountPage, ForumPage, SignInPage, UsersPage }  from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from './redux/selectors';
import { clearUserFavoritePosts, setUserFavoritePosts, signIn } from './redux/slices';

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserSelector);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) dispatch(signIn(userEmail));
  }, [])

  useEffect(() => {
    if (user.id) dispatch(setUserFavoritePosts());
    else dispatch(clearUserFavoritePosts());
  }, [user])

  return (
    <>
    <Routes>
      <Route path='/forum' element={<ForumPage />} />
      {/* <Route path='/forum/:id' element={<PostPage />} /> */}
      <Route path='/users' element={<UsersPage />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='*' element={<Navigate to="/forum" />} />
    </Routes>
    </>
  );
}

export default App;
