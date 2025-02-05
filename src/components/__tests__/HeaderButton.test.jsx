import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { ROLES } from 'src/config';
import { Header } from '..';

const initialState = {
  user: {
    role: ROLES.USER,
  },
};

const mockStore = configureMockStore();
const store = mockStore(initialState);

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe('Header', () => {
  it('should render Header', () => {
    renderWithProviders(<Header />, { store });
  
    expect(screen.getByAltText('WHITEBIRD')).toBeInTheDocument();
    expect(screen.getByTestId('headerButtons')).toBeInTheDocument();
    expect(screen.getByText('Форум')).toHaveAttribute('href', '/forum');
  });

  it('should render Header for Admin', () => {
    const store = mockStore({ user: { role: ROLES.ADMIN } });
    renderWithProviders(<Header />, { store });
  
    expect(screen.getByAltText('WHITEBIRD')).toBeInTheDocument();
    expect(screen.getByTestId('headerButtons')).toBeInTheDocument();
    expect(screen.getByText('Форум')).toHaveAttribute('href', '/forum');
    expect(screen.getByText('Пользователи')).toHaveAttribute('href', '/users');
  });

  it('should go to /forum after click by logo', async () => {
    renderWithProviders(<Header />, { store });
  
    const element = screen.getByTestId('headerLogo');
    await userEvent.click(element);

    expect(mockedNavigate).toHaveBeenCalledWith("/forum");
  });
});