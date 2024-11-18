import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLocalSelector, getPostsSelector } from 'src/redux/selectors';
import { clearLocalMessages, clearPostsMessages } from 'src/redux/slices';
import { Notification } from 'src/UI';

export const PostsMessages = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage } = useSelector(getPostsSelector);
  const { successLocalMessage, errorLocalMessage } = useSelector(getLocalSelector);

  const clearMessages = () => dispatch(clearPostsMessages());
  const clearMessagesInLocal = () => dispatch(clearLocalMessages());
  
  return (
    <div>
      {successMessage && <Notification type='success' message={successMessage} clearMessage={clearMessages} />}
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
      {successLocalMessage && <Notification type='success' message={successLocalMessage} clearMessage={clearMessagesInLocal} />}
      {errorLocalMessage && <Notification type='error' message={errorLocalMessage} clearMessage={clearMessagesInLocal} />}
    </div>
  )
}