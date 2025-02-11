import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { updateUserFavoritePosts, deletePost } from 'src/redux/slices';
import { ROLES } from 'src/config';
import { Card } from '..'; 

const post = {
  id: 1,
  userId: 1,
  title: 'Post 1',
  body: 'Body 1',
  comments_number: 5,
  priority: 1,
}

const user = {
  id: 1,
  name: 'Name',
  username: 'Username',
  email: 'test@gmail.com'
}

const initialState = {
  user: {
    favoritePosts: [],
    role: 'admin'
  },
  posts: {
    users: [user]
  }
};

const mockStore = configureMockStore();
const store = mockStore(initialState);
store.dispatch = jest.fn();

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe('Card', () => {
  it('should render Card', () => {
    renderWithProviders(<Card post={post} />, { store });

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByAltText('favorite')).toBeInTheDocument();
  });

  it('should render Card with showControls, showPriority, movingPostsId', () => {
    renderWithProviders(
      <Card 
        post={post} 
        showControls 
        showPriority 
        movingPostsId={{
          upPostId: 2,
          downPostId: 3
        }} 
      />, 
      { store }
    );

    expect(screen.getByAltText('pencil')).toBeInTheDocument();
    expect(screen.getByAltText('basket')).toBeInTheDocument();
    expect(screen.getByTestId('changePriority')).toBeInTheDocument();
    expect(screen.getByTestId('postMoving')).toBeInTheDocument();
  });
  
  it('should render Card with username', () => {
    renderWithProviders(<Card post={post} />, { store });

    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('should render favorite Card', () => {
    const newState = {
      ...initialState,
      user: {
        ...initialState.user,
        favoritePosts: [1],
      },
    };
    const store = mockStore(newState);

    renderWithProviders(<Card post={post} />, { store });

    expect(screen.getByAltText('favoriteFill')).toBeInTheDocument();
  });

  it('should render Card as unauthenticated user', () => {
    const newState = {
      ...initialState,
      user: {
        ...initialState.user,
        role: ROLES.UNAUTHORIZED,
      },
    };
    const store = mockStore(newState);

    renderWithProviders(<Card post={post} />, { store });

    expect(screen.queryByAltText('favorite')).not.toBeInTheDocument();
    expect(screen.queryByAltText('favoriteFill')).not.toBeInTheDocument();
  });
  
  it('should render Card with modalUpdate', async () => {
    renderWithProviders(<Card post={post} showControls />, { store });
    
    expect(screen.queryByTestId('modalManage')).not.toBeInTheDocument();

    await userEvent.click(screen.getByAltText('pencil'));

    await waitFor(() => 
      expect(screen.getByTestId('modalManage')).toBeInTheDocument()
    );
  });

  it('should render Card with modalDelete', async () => {
    renderWithProviders(<Card post={post} showControls />, { store });
    
    expect(screen.queryByTestId('modalConfirm')).not.toBeInTheDocument();

    await userEvent.click(screen.getByAltText('basket'));

    await waitFor(() => 
      expect(screen.getByTestId('modalConfirm')).toBeInTheDocument()
    );
  });

  it('should handle click of post', async () => {
    renderWithProviders(<Card post={post} />, { store });
    
    const element = screen.getByText('Post 1');

    await userEvent.click(element);

    expect(mockedNavigate).toHaveBeenCalledWith("/forum/1");
  });

  it('should update favorites cards after click by icon', async () => {
    renderWithProviders(<Card post={post} />, { store });

    const element = screen.getByAltText('favorite');
    expect(element).toBeInTheDocument();

    await userEvent.click(element);
    
    expect(store.dispatch).toHaveBeenCalledWith(updateUserFavoritePosts(1));
  });

  it('should delete Card after click by modalDelete', async () => {
    renderWithProviders(<Card post={post} showControls />, { store });

    await userEvent.click(screen.getByAltText('basket'));

    await waitFor(() => 
      expect(screen.getByTestId('modalConfirm')).toBeInTheDocument()
    );

    const deleteButton = screen.getByRole('button', { name: /удалить/i });
    await userEvent.click(deleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(deletePost(1));
  });

  it('should close modalUpdate after click by closeModal', async () => {
    renderWithProviders(<Card post={post} showControls />, { store });
   
    await userEvent.click(screen.getByAltText('pencil'));

    await waitFor(() => 
      expect(screen.getByTestId('modalManage')).toBeInTheDocument()
    );

    const closeButton = screen.getByAltText('cross');
    await userEvent.click(closeButton);

    expect(screen.queryByTestId('modalManage')).not.toBeInTheDocument()
  });

  it('should close modalConfirm after click by closeModal', async () => {
    renderWithProviders(<Card post={post} showControls />, { store });
   
    await userEvent.click(screen.getByAltText('basket'));

    await waitFor(() => 
      expect(screen.getByTestId('modalConfirm')).toBeInTheDocument()
    );

    const closeButton = screen.getByAltText('cross');
    await userEvent.click(closeButton);

    expect(screen.queryByTestId('modalConfirm')).not.toBeInTheDocument()
  });
});