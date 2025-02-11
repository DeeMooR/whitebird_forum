import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { deleteUserByAdmin } from 'src/redux/slices';
import { Users } from '..';

const props = {
  users: [
    { id: 1, name: 'Name 1', username: 'Username 1', email: 'user1@gmail.com'},
    { id: 2, name: 'Name 2', username: 'Username 2', email: 'user2@gmail.com'},
    { id: 3, name: 'Name 3', username: 'Username 3', email: 'user3@gmail.com'}
  ]
}

const mockStore = configureMockStore();
const store = mockStore({});
store.dispatch = jest.fn();

describe('Users', () => {
  it('should render Users with users', () => {
    renderWithProviders(<Users {...props} />, { store });

    expect(screen.getByText('Никнейм')).toBeInTheDocument();
    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByText('Почта')).toBeInTheDocument();

    expect(screen.getAllByText(/Name/)).toHaveLength(3);
    expect(screen.getAllByText(/Username/)).toHaveLength(3);
    expect(screen.getAllByText(/gmail.com/)).toHaveLength(3);
    expect(screen.getAllByAltText('pencil')).toHaveLength(3);
    expect(screen.getAllByAltText('basket')).toHaveLength(3);
  });

  it('should show empty message if there are no users', () => {
    const props = { users: [] }
    renderWithProviders(<Users {...props} />, { store });

    expect(screen.getByText(/пользователей не найдено/i)).toBeInTheDocument();
    expect(screen.queryByText('Никнейм')).not.toBeInTheDocument();
  });

  it('should show modalManage if pencil icon was clicked', async () => {
    renderWithProviders(<Users {...props} />, { store });

    await userEvent.click(screen.getAllByAltText('pencil')[0]);

    expect(screen.getByTestId('modalManage')).toBeInTheDocument();
  });

  it('should show modalConfirm if basket icon was clicked', async () => {
    renderWithProviders(<Users {...props} />, { store });

    await userEvent.click(screen.getAllByAltText('basket')[0]);

    expect(screen.getByTestId('modalConfirm')).toBeInTheDocument();
  });

  it('should call deleteUserByAdmin if clickApply was called', async () => {
    renderWithProviders(<Users {...props} />, { store });

    await userEvent.click(screen.getAllByAltText('basket')[0]);
    await userEvent.click(screen.getByRole('button', { name: /удалить/i }));

    expect(store.dispatch).toHaveBeenCalledWith(deleteUserByAdmin(1));
  });

  it('should hidden modalManage if cross icon was clicked', async () => {
    renderWithProviders(<Users {...props} />, { store });

    await userEvent.click(screen.getAllByAltText('pencil')[0]);
    await userEvent.click(screen.getByAltText('cross'));

    expect(screen.queryByTestId('modalManage')).not.toBeInTheDocument();
  });

  it('should hidden modalConfirm if basket icon was clicked', async () => {
    renderWithProviders(<Users {...props} />, { store });

    await userEvent.click(screen.getAllByAltText('basket')[0]);
    await userEvent.click(screen.getByAltText('cross'));

    expect(screen.queryByTestId('modalConfirm')).not.toBeInTheDocument();
  });
});