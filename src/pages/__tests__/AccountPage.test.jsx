import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { ROLES } from 'src/config';
import { logout, deleteUser, updateUser } from 'src/redux/slices';
import { AccountPage } from '..';

const initState = {
  user: {
    user: {
      id: 1
    },
    role: ROLES.USER,
    isLoading: false,
    errorMessage: null
  },
}

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

let mockIsCorrect = true;
let mockData = {};

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    ...jest.requireActual('react-hook-form').useForm(),
    handleSubmit: jest.fn((fn) => fn(mockData)),
  }),
}));

jest.mock("src/config", () => ({
  ...jest.requireActual("src/config"),
  checkEmptyValues: jest.fn(() => mockIsCorrect),
}));

jest.mock("../AccountPage/config", () => ({
  ...jest.requireActual("../AccountPage/config"),
  convertUser: jest.fn(() => mockData),
}));

describe('AccountPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render AccountPage', () => {
    renderWithProviders(<AccountPage />, { store });

    expect(screen.getByText('Основные данные')).toBeInTheDocument();
    expect(screen.getByText('Адрес')).toBeInTheDocument();
    expect(screen.getAllByTestId('inputBlock')).toHaveLength(8);
    expect(screen.getByRole('button', { name: /удалить/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /изменить/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /выйти/i })).toBeInTheDocument();
  });

  it('should move to /users for admin', async () => {
    const state = {
      user: { ...initState.user, role: ROLES.ADMIN }
    }
    const store = mockStore(state);
    renderWithProviders(<AccountPage />, { store });

    await userEvent.click(screen.getByText('Все пользователи'));

    expect(mockedNavigate).toHaveBeenCalledWith('/users');
  });

  it('should move to /forum for unauthorized user', async () => {
    const state = {
      user: { ...initState.user, role: ROLES.UNAUTHORIZED }
    }
    const store = mockStore(state);
    renderWithProviders(<AccountPage />, { store });

    expect(mockedNavigate).toHaveBeenCalledWith('/forum');
  });

  it('should open and close error notification', async () => {
    const state = {
      user: { ...initState.user, errorMessage: 'error' }
    }
    const store = mockStore(state);
    renderWithProviders(<AccountPage />, { store });

    expect(screen.getByText('error')).toBeInTheDocument();

    await userEvent.click(screen.getByAltText('close'));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should show loader if isLoading is true', async () => {
    const state = {
      user: { ...initState.user, isLoading: true }
    }
    const store = mockStore(state);
    renderWithProviders(<AccountPage />, { store });

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
    });
  });

  it('should call logout() if user click on button', async () => {
    renderWithProviders(<AccountPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: /выйти/i }));

    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });

  it('should open modalConfirm and delete user', async () => {
    renderWithProviders(<AccountPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: /удалить/i }));
    expect(screen.getByTestId('modalConfirm')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /да, удалить/i }));
    expect(store.dispatch).toHaveBeenCalledWith(deleteUser(1));
    expect(screen.queryByTestId('modalConfirm')).not.toBeInTheDocument();
  });

  it('should close modalConfirm after click on cross icon', async () => {
    renderWithProviders(<AccountPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: /удалить/i }));
    expect(screen.getByTestId('modalConfirm')).toBeInTheDocument();

    await userEvent.click(screen.getByAltText('cross'));
    expect(screen.queryByTestId('modalConfirm')).not.toBeInTheDocument();
  })

  it('should handle click on btnUpdate', async () => {
    renderWithProviders(<AccountPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: /изменить/i }));
    expect(store.dispatch).toHaveBeenCalledWith(updateUser(mockData));
  });

  it('should not update user if data is not correct', async () => {
    mockIsCorrect = false;
    renderWithProviders(<AccountPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: /изменить/i }));
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
