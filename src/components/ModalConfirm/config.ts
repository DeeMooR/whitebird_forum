interface IModalConfirmData {
  title: string,
  btnApply: string,
}

export type ModalConfirmActionType = 'update_account' | 'delete_user' | 'delete_account' | 'delete_post';

export const ModalConfirmData: { [action: string]: IModalConfirmData } = {
  delete_user: {
    title: 'Удалить пользователя?',
    btnApply: 'Да, удалить',
  },
  delete_account: {
    title: 'Удалить аккаунт?',
    btnApply: 'Да, удалить',
  },
  delete_post: {
    title: 'Удалить пост?',
    btnApply: 'Да, удалить',
  },
  update_account: {
    title: 'Изменить пользователя?',
    btnApply: 'Да, изменить',
  },
};

export const isModalDelete = (action: ModalConfirmActionType) => {
  return action.includes('delete');
};