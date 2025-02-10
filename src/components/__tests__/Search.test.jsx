import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { setPostsSearch, getPostsByUser } from 'src/redux/slices';
import { Search } from '..';

const props = {
  data: 'posts'
}

const mockStore = configureMockStore();
const store = mockStore({});
store.dispatch = jest.fn();

let mockData = {};

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    ...jest.requireActual('react-hook-form').useForm(),
    handleSubmit: jest.fn((fn) => (e) => {
      e.preventDefault();
      fn(mockData);
    }),
  }),
}));

describe('Search', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render Search', () => {
    renderWithProviders(<Search />, { store });

    expect(screen.getByTestId('inputBlock')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /поиск/i })).toBeInTheDocument();
  });

  it('should not handle button click, if search and previousSearch are empty', async () => {
    renderWithProviders(<Search />, { store });

    await userEvent.click(screen.getByRole('button', { name: /поиск/i }));

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should call setPostsSearch, getPostsByUser if button is clicked', async () => {
    mockData = { search: 'test text' };
    renderWithProviders(<Search {...props} />, { store });

    await userEvent.type(screen.getByPlaceholderText('никнейм, email'), mockData.search);
    await userEvent.click(screen.getByRole('button', { name: /поиск/i }));

    expect(store.dispatch).toHaveBeenCalledWith(setPostsSearch(mockData.search));
    expect(store.dispatch).toHaveBeenCalledWith(getPostsByUser(mockData.search));
  });

  it('should call user action if button is clicked', async () => {
    const props = { data: 'users' };
    mockData = { search: 'test text' };
    renderWithProviders(<Search {...props} />, { store });

    await userEvent.type(screen.getByPlaceholderText('никнейм, email'), mockData.search);
    await userEvent.click(screen.getByRole('button', { name: /поиск/i }));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should call action post, if search is empty and previousSearch is not empty', async () => {
    renderWithProviders(<Search {...props} />, { store });
 
    mockData = { search: 'test text' };
    await userEvent.type(screen.getByPlaceholderText('никнейм, email'), mockData.search);
    await userEvent.click(screen.getByRole('button', { name: /поиск/i }));

    mockData = { search: '' };
    await userEvent.type(screen.getByPlaceholderText('никнейм, email'), mockData.search);
    await userEvent.click(screen.getByRole('button', { name: /поиск/i }));

    expect(store.dispatch).toHaveBeenCalledTimes(4);
  });
});