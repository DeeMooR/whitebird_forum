interface IModalConfirmData {
  title: string,
  btnApply: string,
}

export type ModalConfirmActionType = 'update_account' | 'delete_user' | 'delete_account';

export const ModalConfirmData: { [action: string]: IModalConfirmData } = {
  delete_user: {
    title: 'Удалить пользователя?',
    btnApply: 'Да, удалить',
  },
  delete_account: {
    title: 'Удалить аккаунт?',
    btnApply: 'Да, удалить',
  },
  update_account: {
    title: 'Изменить пользователя?',
    btnApply: 'Да, изменить',
  },
};

export const isModalDelete = (action: ModalConfirmActionType) => {
  return action === 'delete_user' || action === 'delete_account';
}