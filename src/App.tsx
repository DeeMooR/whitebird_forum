import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AccountPage, ForumPage, SignInPage }  from './pages';
import { useSelector } from 'react-redux';
import { getUserSelector } from './redux/selectors';

const App = () => {
  const { role } = useSelector(getUserSelector);

  return (
    <>
    <Routes>
      <Route path='/forum' element={<ForumPage />} />
      {/* <Route path='/forum/:id' element={<PostPage />} /> */}
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/account' element={<AccountPage />} />
      <Route path='*' element={<Navigate to="/forum" />} />
    </Routes>
    </>
  );
}

export default App;
