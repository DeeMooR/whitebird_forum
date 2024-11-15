import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearUsersMessages, getUsers } from 'src/redux/slices';
import { getUsersSelector } from 'src/redux/selectors';
import { Search, Users } from 'src/components';
import { PageTemplate } from 'src/pages'
import { Loading, Notification } from 'src/UI'
import cls from './styles.module.scss';

export const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, isLoading, errorMessage } = useSelector(getUsersSelector);

  useEffect(() => {
    document.body.style.overflowY = "scroll";
    return () => {document.body.style.overflowY = "auto"};
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  const clearMessages = () => dispatch(clearUsersMessages());

  return (
    <PageTemplate>
      <div className={cls.usersPage}>
        <h1 className={cls.usersPage__title}>Пользователи</h1>
        <div className={cls.usersPage__search}>
          <Search data='users' />
        </div>
        {isLoading ? (
          <div className={cls.usersPage__loading}>
            <Loading />
          </div>
        ) : (
          <Users users={users} />
        )}
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}
