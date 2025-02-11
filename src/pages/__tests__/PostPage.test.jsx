import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { clearPostMessages } from 'src/redux/slices';
import { initState } from '../__mocks__/postPage.mock';
import { PostPage } from '..';

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

const mockGetPostDataFunc = jest.fn();

jest.mock("../PostPage/config", () => ({
  ...jest.requireActual("../PostPage/config"),
  getPostDataFunc: () => mockGetPostDataFunc,
}));

jest.mock('src/components', () => ({
  ...jest.requireActual('src/components'),
  PostControls: () => (
    <div data-testId="mockPostControls"></div>
  ),
  PostComments: () => (
    <div data-testId="mockPostComments"></div>
  ),
}));

jest.mock('..', () => ({
  ...jest.requireActual('..'),
  PageTemplate: ({ children }) => (
    <div data-testId="mockPageTemplate">
      {children}
    </div>
  ),
}));

describe('PostPage', () => {
  it('should render PostPage', () => {
    renderWithProviders(<PostPage />, { store });

    expect(screen.getByAltText('user')).toBeInTheDocument();
    expect(screen.getByText('username')).toBeInTheDocument();
    expect(screen.getByText('test@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();

    expect(screen.getByTestId('mockPostControls')).toBeInTheDocument();
    expect(screen.getByTestId('mockPostComments')).toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledWith(mockGetPostDataFunc);
  });

  it('should show loader if isLoading is true', async () => {
    const state = {
      ...initState,
      post: { ...initState.post, isLoading: true }
    }
    const store = mockStore(state);
    store.dispatch = jest.fn();
    renderWithProviders(<PostPage />, { store });

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
    });
  });

  it('should show notification and handle clearMessages', async () => {
    const state = {
      ...initState,
      post: { ...initState.post, errorMessage: 'error' }
    }
    const store = mockStore(state);
    store.dispatch = jest.fn();
    renderWithProviders(<PostPage />, { store });

    expect(screen.getByText('error')).toBeInTheDocument();
    
    await userEvent.click(screen.getByAltText('close'));
    expect(store.dispatch).toHaveBeenCalledWith(clearPostMessages());
  })
});