import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostSelector } from 'src/redux/selectors';
import { clearPostMessages, clearPostState, getPost } from 'src/redux/slices';
import { PostComments, PostControls } from 'src/components';
import { PageTemplate } from 'src/pages'
import { userPhoto1Image } from 'src/assets';
import { Loading, Notification } from 'src/UI';
import cls from './styles.module.scss';

export const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: param } = useParams();
  const { post, user, isLoading, errorMessage } = useSelector(getPostSelector);

  useEffect(() => {
    const obj = {
      postId: +param!,
      navigate
    }
    dispatch(getPost(obj));
    return () => { dispatch(clearPostState()) }
  }, [param])

  const clearMessages = () => dispatch(clearPostMessages());

  return (
    <PageTemplate showScroll>
      <div className={cls.post}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
          <div className={cls.post__author}>
            <img src={userPhoto1Image} alt="user" />
            <div className={cls.author__info}>
              <p className={cls.author__username}>{user?.username}</p>
              <p className={cls.author__email}>{user?.email}</p>
            </div>
          </div>
          <div className={cls.post__info}>
            <h2 className={cls.post__title}>{post?.title}</h2>
            <p className={cls.post__body}>{post?.body}</p>
          </div>
          <div className={cls.post__controls}>
            <PostControls />
          </div>
          <div className={cls.post__comments}>
            <PostComments />
          </div>
          </>
        )}
      </div>
      {errorMessage && <Notification type='error' message={errorMessage} clearMessage={clearMessages} />}
    </PageTemplate>
  )
}

