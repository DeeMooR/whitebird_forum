import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ForumPage }  from './pages';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/forum' element={<ForumPage />} />
      {/* <Route path='/forum/:id' element={<PostPage />} />
      <Route path='/auth' element={<AuthPage />} /> */}
      <Route path='*' element={<Navigate to="/forum" />} />
    </Routes>
    </>
  );
}

export default App;
