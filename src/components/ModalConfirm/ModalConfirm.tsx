import React, { FC } from 'react'
import { ModalTemplate } from 'src/components';
import { ModalConfirmActionType, ModalConfirmData, isModalDelete } from './config';
import cn from 'classnames';
import cls from './styles.module.scss';

interface IModalConfirm {
  action: ModalConfirmActionType,
  clickApply: () => void,
  closeModal: () => void
}

export const ModalConfirm:FC<IModalConfirm> = ({action, clickApply, closeModal}) => {
  const { title, btnApply } = ModalConfirmData[action];
  const isDelete = isModalDelete(action);

  const btnApplyStyle = cn({
    btnDelete: isDelete,
  });

  return (
    <ModalTemplate closeModal={closeModal} className={isDelete ? 'isDelete' : ''}>
      <div className={cls.modalConfirm}>
        <h3>{title}</h3>
        <div className={cls.modalConfirm__buttons}>
          <button className={cls.btnCancel} onClick={closeModal}>Нет, оставить</button>
          <button className={btnApplyStyle} onClick={clickApply}>{btnApply}</button>
        </div>
      </div>
    </ModalTemplate>
  )
}
