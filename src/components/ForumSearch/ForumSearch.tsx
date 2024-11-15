import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsByUser } from 'src/redux/slices';
import { ISearch } from 'src/interfaces';
import { Input } from 'src/UI';
import cls from './styles.module.scss';

export const ForumSearch = () => {
  const dispatch = useDispatch();
  const [previousSearch, setPreviousSearch] = useState('');

  const {
    register,
    handleSubmit,
  } = useForm<ISearch>({
    mode: 'onChange',
  });

  const onSubmit = ({ search }: ISearch) => {
    if (!search && previousSearch === '') return;
    const action = search ? getPostsByUser(search) : getPosts();
    dispatch(action);
    setPreviousSearch(search);
  }

  return (
    <form className={cls.forumSearch} onSubmit={handleSubmit(onSubmit)}>
      <Input
        id='search'
        register={register}
        type="text"
        placeholder='username, email'
        classNameInput='inputSearch'
      />
      <button type="submit" className={cls.forumSearch__btnSent}>Поиск</button>
    </form>
  )
}
