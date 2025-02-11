import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { getUsers, clearUsersMessages } from 'src/redux/slices';
import { UsersPage } from '..';

const initState = {
  users: {
    users: [],
    isLoading: false,
    successMessage: null,
    errorMessage: null
  }
}

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('..', () => ({
  ...jest.requireActual('..'),
  PageTemplate: ({ children }) => (
    <div data-testId="mockPageTemplate">
      {children}
    </div>
  ),
}));

jest.mock('src/components', () => ({
  ...jest.requireActual('src/components'),
  Search: () => (<div data-testId="mockSearch"></div>),
  Users: () => (<div data-testId="mockUsers"></div>),
}));

describe('UsersPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render UsersPage', () => {
    renderWithProviders(<UsersPage />, { store });

    expect(store.dispatch).toHaveBeenCalledWith(getUsers());
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByTestId('mockSearch')).toBeInTheDocument();
    expect(screen.getByTestId('mockUsers')).toBeInTheDocument();
  });

  it('should render UsersPage with success notification', async () => {
    const state = {
      users: { ...initState.users, successMessage: 'success' }
    }
    const store = mockStore(state);
    store.dispatch = jest.fn();
    renderWithProviders(<UsersPage />, { store });

    expect(screen.getByText('success')).toBeInTheDocument();

    await userEvent.click(screen.getByAltText('close'));
    expect(screen.queryByText('success')).not.toBeInTheDocument();
    expect(store.dispatch).toHaveBeenCalledWith(clearUsersMessages());
  })

  it('should render UsersPage with error notification', async () => {
    const state = {
      users: { ...initState.users, errorMessage: 'error' }
    }
    const store = mockStore(state);
    store.dispatch = jest.fn();
    renderWithProviders(<UsersPage />, { store });

    expect(screen.getByText('error')).toBeInTheDocument();

    await userEvent.click(screen.getByAltText('close'));
    expect(screen.queryByText('error')).not.toBeInTheDocument();
    expect(store.dispatch).toHaveBeenCalledWith(clearUsersMessages());
  })

  it('should show loader if idLoading is true', async () => {
    const state = {
      users: { ...initState.users, isLoading: true }
    }
    const store = mockStore(state);
    renderWithProviders(<UsersPage />, { store });

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
    });
  });
});