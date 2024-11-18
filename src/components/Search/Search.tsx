import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setPostsSearch } from 'src/redux/slices';
import { dataType, getSearchAction } from './config';
import { ISearchForm } from 'src/interfaces';
import { Input } from 'src/UI';
import cls from './styles.module.scss';

interface ISearch {
  data: dataType
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
    if (data === 'posts') dispatch(setPostsSearch(search));
    setPreviousSearch(search);
    
    const action = getSearchAction[data](search);
    dispatch(action);
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
