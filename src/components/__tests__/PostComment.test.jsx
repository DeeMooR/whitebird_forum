import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { createComment, clearLocalMessages } from 'src/redux/slices';
import { ROLES } from 'src/config';
import { initialState } from '../__mocks__/postComment.mock';
import { PostComments } from '..'; 

const mockStore = configureMockStore();
const store = mockStore(initialState);
store.dispatch = jest.fn();

const getAuthStore = () => {
  const state = { 
    ...initialState, 
    user: { role: ROLES.USER }
  }
  const store = mockStore(state); 
  store.dispatch = jest.fn();
  return store;
}

let mockData = {};
const mockReset = jest.fn();

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    ...jest.requireActual('react-hook-form').useForm(),
    handleSubmit: jest.fn((fn) => (e) => {
      e.preventDefault();
      fn(mockData);
    }),
    reset: mockReset,
  }),
}));

jest.mock('..', () => ({
  ...jest.requireActual('..'),
  Comment: () => (<div data-testId="mockComment"></div>),
}));

describe('PostComments', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render PostComments with comments for unauthorized user', () => {
    renderWithProviders(<PostComments />, { store });

    expect(screen.getByText('Комментарии (3)')).toBeInTheDocument();
    expect(screen.getAllByTestId('mockComment')).toHaveLength(3);

    expect(screen.queryByTestId('inputBlock')).not.toBeInTheDocument();
    expect(screen.queryByTestId('textareaBlock')).not.toBeInTheDocument();
  });

  it('should render PostComments for authorized user', () => {
    renderWithProviders(<PostComments />, { store: getAuthStore() });

    expect(screen.getByAltText('user')).toBeInTheDocument();
    expect(screen.getByTestId('inputBlock')).toBeInTheDocument();
    expect(screen.getByTestId('textareaBlock')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /Сохранить/ });
    expect(button).toHaveClass('comment__btnSend');
    expect(button).toHaveClass('btnSmall');
  });

  it('should render PostComments with loading', async () => {
    const state = { 
      ...initialState, 
      local: { ...initialState.local, isLoading: true }
    }
    const store = mockStore(state); 
    renderWithProviders(<PostComments />, { store });

    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
    });
  });

  it('should render PostComments with empty message', () => {
    const state = { 
      ...initialState, 
      post: { ...initialState.post, comments: [] },
      local: { ...initialState.local, comments: [] }
    }
    const store = mockStore(state); 
    renderWithProviders(<PostComments />, { store });

    expect(screen.queryByTestId('mockComment')).not.toBeInTheDocument();
    expect(screen.getByText('Комментариев нет')).toBeInTheDocument();
  
  });

  it('should render PostComments with success notification', () => {
    const state = { 
      ...initialState, 
      local: { ...initialState.local, successLocalMessage: 'success' }
    }
    const store = mockStore(state); 
    renderWithProviders(<PostComments />, { store });

    expect(screen.queryByText('success')).toBeInTheDocument();
  });

  it('should render PostComments with error notification', () => {
    const state = { 
      ...initialState, 
      local: { ...initialState.local, errorLocalMessage: 'error' }
    }
    const store = mockStore(state); 
    renderWithProviders(<PostComments />, { store });

    expect(screen.queryByText('error')).toBeInTheDocument();
  });

  it('should save comment after click on button', async () => {
    mockData = { name: 'Title', body: 'Body' };
    const store = getAuthStore();
    renderWithProviders(<PostComments />, { store });
    
    await userEvent.type(screen.getByPlaceholderText('Заголовок'), mockData.name);
    await userEvent.type(screen.getByPlaceholderText('Текст'), mockData.body);
   
    await userEvent.click(screen.getByRole('button', { name: /Сохранить/ }));
   
    expect(store.dispatch).toHaveBeenCalledWith(createComment(mockData));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('should not save comment if data is incorrect', async () => {
    mockData = { name: 'Title', body: '' };
    const store = getAuthStore();
    renderWithProviders(<PostComments />, { store });

    await userEvent.type(screen.getByPlaceholderText('Заголовок'), mockData.name);

    await userEvent.click(screen.getByRole('button', { name: /Сохранить/i }));
    
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should call clearMessages() if clicked on closeIcon', async () => {
    const state = { 
      ...initialState, 
      local: { ...initialState.local, errorLocalMessage: 'error' }
    }
    const store = mockStore(state); 
    store.dispatch = jest.fn();
    renderWithProviders(<PostComments />, { store });

    await userEvent.click(screen.getByAltText('close'));
    
    expect(store.dispatch).toHaveBeenCalledWith(clearLocalMessages());
  });
});