import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AccountPage, ForumPage, SignInPage, UsersPage }  from './pages';
import { useDispatch } from 'react-redux';
import { signIn } from './redux/slices';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) dispatch(signIn(userEmail))
  }, [])

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
