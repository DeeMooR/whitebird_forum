import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserSelector } from 'src/redux/selectors';
import { signIn } from 'src/redux/slices/userSlice';

export const SignInPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);

  useEffect(() => {
    dispatch(signIn('Sincere@april.biz'));
  }, [dispatch]);

  return (
    <div className='signInPage'>
      
    </div>
  )
}