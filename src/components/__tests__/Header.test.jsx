import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { ROLES } from 'src/config';
import { HeaderButtons } from '..';

const initialState = {
  user: {
    role: ROLES.UNAUTHORIZED,
  },
};

const mockStore = configureMockStore();
const store = mockStore(initialState);

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const testClickByIcon = async (altText, href) => {
  const store = mockStore({ user: { role: ROLES.USER } });
  renderWithProviders(<HeaderButtons />, { store });

  await userEvent.click(screen.getByAltText(altText));

  expect(mockedNavigate).toHaveBeenCalledWith(href);
}

describe('HeaderButtons', () => {
  it('should render HeaderButtons for unauthorized user', () => {
    renderWithProviders(<HeaderButtons />, { store });

    expect(screen.getByRole('button', { name: /войти/i })).toBeInTheDocument();
  });

  it('should render HeaderButtons for authorized user', () => {
    const store = mockStore({ user: { role: ROLES.USER } });
    renderWithProviders(<HeaderButtons />, { store });
  
    expect(screen.getByAltText('favorite')).toBeInTheDocument();
    expect(screen.getByAltText('myPosts')).toBeInTheDocument();
    expect(screen.getByAltText('account')).toBeInTheDocument();
  });

  it('should go to /sign-in after click by login button', async () => {
    renderWithProviders(<HeaderButtons />, { store });
  
    const element = screen.getByRole('button', { name: /войти/i });
    await userEvent.click(element);

    expect(mockedNavigate).toHaveBeenCalledWith("/sign-in");
  });

  it('should go to /favorites after click by favoriteIcon', () => {
    testClickByIcon('favorite', '/favorites');
  });

  it('should go to /myPosts after click by myPostsIcon', async () => {
    testClickByIcon('myPosts', '/myPosts');
  });

  it('should go to /account after click by accountIcon', async () => {
    testClickByIcon('account', '/account');
  });
});