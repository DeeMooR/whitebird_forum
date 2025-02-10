import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { PostsMessages } from '..';

const initState = {
  posts: {
    successMessage: 'Post created successfully',
    errorMessage: 'Failed to create post',
  },
  local: {
    successLocalMessage: 'Local action successful',
    errorLocalMessage: 'Local action failed',
  },
}

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

describe('PostsMessages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render PostsMessages with notifications', () => {
    renderWithProviders(<PostsMessages />, { store });

    expect(screen.getByText(initState.posts.successMessage)).toBeInTheDocument();
    expect(screen.getByText(initState.posts.errorMessage)).toBeInTheDocument();
    expect(screen.getByText(initState.local.successLocalMessage)).toBeInTheDocument();
    expect(screen.getByText(initState.local.errorLocalMessage)).toBeInTheDocument();
  });

  it('should call clearPostsMessages, clearLocalMessages if close icon is clicked', async () => {
    renderWithProviders(<PostsMessages />, { store });

    const closeButtons = screen.getAllByAltText('close');
    closeButtons.forEach(async (button) => {
      await userEvent.click(button);
    });

    expect(store.dispatch).toHaveBeenCalledTimes(4);
  });
});