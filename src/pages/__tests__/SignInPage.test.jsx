import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { clearUserMessages, signIn } from 'src/redux/slices';
import { ROLES } from 'src/config';
import { SignInPage } from '..';

const initState = {
  user: {
    role: ROLES.UNAUTHORIZED,
    isLoading: false,
    errorMessage: null
  }
}

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

let mockData = {};
const mockedNavigate = jest.fn();
const mockSetError = jest.fn();

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    ...jest.requireActual('react-hook-form').useForm(),
    handleSubmit: jest.fn((fn) => (e) => {
      e.preventDefault();
      fn(mockData);
    }),
    setError: mockSetError,
  }),
}));

jest.mock('..', () => ({
  ...jest.requireActual('..'),
  PageTemplate: ({ children }) => (
    <div data-testId="mockPageTemplate">
      {children}
    </div>
  ),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe('SignInPage', () => {
  it('should render SignInPage', () => {
    renderWithProviders(<SignInPage />, { store });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument();
  });

  it('should show loader if idLoading is true', async () => {
    const state = {
      ...initState,
      user: { ...initState.user, isLoading: true }
    }
    const store = mockStore(state);
    store.dispatch = jest.fn();
    renderWithProviders(<SignInPage />, { store });

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
    });
  });

  it('should show notification and handle clearMessage', async () => {
    const state = {
      ...initState,
      user: { ...initState.user, errorMessage: 'error' }
    }
    const store = mockStore(state);
    store.dispatch = jest.fn();
    renderWithProviders(<SignInPage />, { store });

    expect(screen.getByText('error')).toBeInTheDocument();
    
    await userEvent.click(screen.getByAltText('close'));
    expect(store.dispatch).toHaveBeenCalledWith(clearUserMessages());
  })

  it('should move to /forum if user is authorized', () => {
    const state = {
      ...initState,
      user: { ...initState.user, role: ROLES.USER }
    }
    const store = mockStore(state);
    renderWithProviders(<SignInPage />, { store });

    expect(mockedNavigate).toHaveBeenCalledWith('/forum')
  });

  it('should send request user if data is correct', async () => {
    mockData = { email: 'test@gmail.com' };
    renderWithProviders(<SignInPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));
    expect(store.dispatch).toHaveBeenCalledWith(signIn(mockData.email));
  });

  it('should not send request user if data is not correct', async () => {
    mockData = {};
    renderWithProviders(<SignInPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));
    expect(mockSetError).toHaveBeenCalled();
  });
});