import React, { FC } from 'react'
import { ModalTemplate } from 'src/components';
import cls from './styles.module.scss';
import { IInput, IPost, ITextarea, IUser } from 'src/interfaces';
import { useForm } from 'react-hook-form';
import { Input, Textarea } from 'src/UI';
import { useDispatch } from 'react-redux';
import { fieldsToCheck, getModalManageAction, modalFields, objType, pageType } from './config';
import { checkEmptyValues } from 'src/config';

interface IModalManage {
  obj: IUser | IPost,
  type: objType,
  page: pageType,
  title: string,
  closeModal: () => void
}

export const ModalManage:FC<IModalManage> = ({obj, type, page, title, closeModal}) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IUser | IPost>({
    mode: 'onChange',
    defaultValues: obj
  });

  const onSubmit = (data: IUser | IPost) => {
    const isCorrect = checkEmptyValues(data, fieldsToCheck[type], setError);
    if (!isCorrect) return;
    const action = getModalManageAction[page](data);
    dispatch(action);
    closeModal();
  }

  return (
    <ModalTemplate closeModal={closeModal}>
      <form className={cls.modalManage} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={cls.modalManage__title}>{title}</h3>
        <div className={cls.modalManage__fields}>
          {modalFields[type].map(({ element, data }) => 
            element === 'input' ? (
              <Input
                id={data.id}
                register={register}
                type={(data as IInput).type}
                title={data.title}
                placeholder={data.placeholder}
                error={errors[data.id as keyof typeof errors]?.message}
                key={data.id}
              />
            ) : (
              <Textarea
                id={data.id}
                register={register}
                title={data.title}
                placeholder={data.placeholder}
                error={errors[data.id as keyof typeof errors]?.message}
                max={(data as ITextarea).max}
                key={data.id}
              />
            )
          )}
        </div>
        <div className={cls.modalManage__buttons}>
          <button type='button' className={cls.btnCancel} onClick={closeModal}>Отмена</button>
          <button className={cls.btnChange}>Изменить</button>
        </div>
      </form>
    </ModalTemplate>
  )
}
