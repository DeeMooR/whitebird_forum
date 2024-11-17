import React, { FC } from 'react'
import { ModalTemplate } from 'src/components';
import cls from './styles.module.scss';
import { IComment, IInput, IPost, ITextarea, IUser } from 'src/interfaces';
import { useForm } from 'react-hook-form';
import { Input, Textarea } from 'src/UI';
import { useDispatch } from 'react-redux';
import { actionType, fieldsToCheck, getModalManageAction, idType, modalFields, modalManageText, objStructure, objType } from './config';
import { checkEmptyValues } from 'src/config';

interface IModalManage {
  id: idType,
  obj?: objType,
  type: objStructure,
  action: actionType,
  closeModal: () => void
}

export const ModalManage:FC<IModalManage> = ({id, obj, type, action, closeModal}) => {
  const dispatch = useDispatch();
  const { title, btnText } = modalManageText[type][action];

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<objType>({
    mode: 'onChange',
    defaultValues: obj || {}
  });

  const onSubmit = (data: objType) => {
    const isCorrect = checkEmptyValues(data, fieldsToCheck[type], setError);
    if (!isCorrect) return;
    const func = getModalManageAction[id](data);
    dispatch(func);
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
          <button className={cls.btnChange}>{btnText}</button>
        </div>
      </form>
    </ModalTemplate>
  )
}
