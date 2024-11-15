import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ISearchForm } from 'src/interfaces';
import { Input } from 'src/UI';
import { getSearchAction } from './config';
import cls from './styles.module.scss';

interface ISearch {
  data: 'users' | 'posts'
}

export const Search:FC<ISearch> = ({ data }) => {
  const dispatch = useDispatch();
  const [previousSearch, setPreviousSearch] = useState('');

  const {
    register,
    handleSubmit,
  } = useForm<ISearchForm>({
    mode: 'onChange',
  });

  const onSubmit = ({ search }: ISearchForm) => {
    if (!search && previousSearch === '') return;
    const action = getSearchAction[data](search)
    dispatch(action);
    setPreviousSearch(search);
  }

  return (
    <form className={cls.search} onSubmit={handleSubmit(onSubmit)}>
      <Input
        id='search'
        register={register}
        type="text"
        placeholder='никнейм, email'
        classNameInput='inputSearch'
      />
      <button type="submit" className={cls.search__btnSent}>Поиск</button>
    </form>
  )
}
