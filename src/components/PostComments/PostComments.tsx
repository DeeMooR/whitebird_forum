import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalSelector, getPostSelector, getUserSelector } from 'src/redux/selectors';
import { clearLocalMessages, createComment } from 'src/redux/slices';
import { ROLES, checkEmptyValues } from 'src/config';
import { INewComment } from 'src/interfaces';
import { userPhoto1Image } from 'src/assets';
import { Comment } from 'src/components';
import { Input, Loading, Textarea, Notification } from 'src/UI';
import cn from 'classnames';
import cls from './styles.module.scss';

export const PostComments = () => {
  const dispatch = useDispatch();
  const { role } = useSelector(getUserSelector);
  const { post, comments } = useSelector(getPostSelector);
  const { comments: localComments, isLoading, successLocalMessage, errorLocalMessage } = useSelector(getLocalSelector);

  // новые комментарии хранятся отдельно в localState
  const postLocalComments = localComments.filter((comment) => comment.postId === post?.id)
  const allComments = [...postLocalComments, ...comments];

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<INewComment>({
    mode: 'onChange'
  });

  const onSubmit = (data: INewComment) => {
    const isCorrect = checkEmptyValues(data, ['name', 'body'], setError);
    if (!isCorrect) return;
    dispatch(createComment(data));
    reset();
  }

  const clearMessages = () => dispatch(clearLocalMessages());

  return (
    <div className={cls.comments}>
      <div className={cls.comments__header}>
        <p className={cls.header__text}>{`Комментарии (${allComments.length})`}</p>
        <hr className={cls.header__line} />
      </div>
      {role !== ROLES.UNAUTHORIZED &&
        <div className={cls.comment__creation}>
          <img src={userPhoto1Image} className={cls.comment__photo} alt="user" />
          <form className={cls.comment__fields} onSubmit={handleSubmit(onSubmit)}>
            <Input
              id='name'
              register={register}
              type='text'
              placeholder='Заголовок'
              error={errors.name?.message}
            />
            <Textarea
              id='body'
              register={register}
              placeholder='Текст'
              error={errors.body?.message}
            />
            <button className={cn(cls.comment__btnSend, 'btnSmall')}>Сохранить</button>
          </form>
        </div>
      }
      {isLoading ? (
        <div className={cls.comments__loading}>
          <Loading />
        </div>
      ) : (
        !!allComments.length ? (
          <div className={cls.comments__list}>
            {allComments.map(item => (
              <Comment obj={item} key={item.id} />
            ))}
          </div>
        ) : (
          <p className={cls.comments__empty}>Комментариев нет</p>
        )
      )}
      {successLocalMessage && <Notification type='success' message={successLocalMessage} clearMessage={clearMessages} />}
      {errorLocalMessage && <Notification type='error' message={errorLocalMessage} clearMessage={clearMessages} />}
    </div>
  )
}