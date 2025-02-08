import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { updatePostLikes, updatePostDislikes, updateUserFavoritePosts, deleteLocalPost, deletePostInPostPage } from 'src/redux/slices';
import { ROLES } from 'src/config';
import { PostControls } from '..';

const initState = {
  post: {
    post: { id: 2, userId: 1 },
    controls: {
      likeUserIds: [1, 2, 3],
      dislikeUserIds: [4, 5]
    }
  },
  user: {
    role: ROLES.UNAUTHORIZED,
    user: { id: 10 },
    favoritePosts: [1]
  }
}

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const handleClickIcon = async (testId, action) => {
  const state = {
    ...initState,
    user: { ...initState.user, role: ROLES.USER }
  }
  const store = mockStore(state);
  store.dispatch = jest.fn();
  renderWithProviders(<PostControls />, { store });

  await userEvent.click(screen.getByTestId(testId));

  expect(store.dispatch).toHaveBeenCalledWith(action);
}

const handleClickControl = async (altText, testId) => {
  const state = {
    ...initState,
    user: { ...initState.user, role: ROLES.USER },
    post: { ...initState.post, post: { id: 2, userId: 10 } }
  }
  const store = mockStore(state);
  renderWithProviders(<PostControls />, { store });

  await userEvent.click(screen.getByAltText(altText));

  expect(screen.getByTestId(testId)).toBeInTheDocument();
};

const handleCloseModal = async (altText, testId) => {
  await handleClickControl(altText, testId);

  await userEvent.click(screen.getByAltText('cross')); 

  expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
};

const handleDeletePost = async (postId, action) => {
  const state = {
    ...initState,
    user: { ...initState.user, role: ROLES.USER },
    post: { ...initState.post, post: { id: postId, userId: 10 } }
  }
  const store = mockStore(state);
  store.dispatch = jest.fn();
  renderWithProviders(<PostControls />, { store });

  await userEvent.click(screen.getByAltText('basket'));
  expect(screen.getByTestId('modalConfirm')).toBeInTheDocument();

  await userEvent.click(screen.getByText('Да, удалить'));

  const obj = postId > 100 
    ? { postId: postId, navigate: mockedNavigate }
    : { id: postId, navigate: mockedNavigate }
  expect(store.dispatch).toHaveBeenCalledWith(action(obj));
}

describe('PostControls', () => {
  it('should render PostControls for unauthorized user', () => {
    renderWithProviders(<PostControls />, { store });

    expect(screen.getByTestId('likesCounter')).toHaveTextContent('3');
    expect(screen.getByTestId('dislikesCounter')).toHaveTextContent('2');
    expect(screen.getByAltText('like')).toBeInTheDocument();
    expect(screen.getByAltText('dislike')).toBeInTheDocument();

    expect(screen.queryByAltText('favoriteFill')).not.toBeInTheDocument();
    expect(screen.queryByAltText('favorite')).not.toBeInTheDocument();
    expect(screen.queryByAltText('pencil')).not.toBeInTheDocument();
    expect(screen.queryByAltText('basket')).not.toBeInTheDocument();
  });

  it('should render PostControls for authorized user', () => {
    const state = {
      ...initState,
      user: { ...initState.user, role: ROLES.USER }
    }
    const store = mockStore(state);
    renderWithProviders(<PostControls />, { store });

    expect(screen.getByAltText('favorite')).toBeInTheDocument();
  });

  it('should show controls for author of post', () => {
    const state = {
      ...initState,
      user: { ...initState.user, role: ROLES.USER },
      post: { ...initState.post, post: { id: 2, userId: 10 } }
    }
    const store = mockStore(state);
    renderWithProviders(<PostControls />, { store });

    expect(screen.getByAltText('pencil')).toBeInTheDocument();
    expect(screen.getByAltText('basket')).toBeInTheDocument();
  });

  it('should show likeFill and favoriteFill icons', () => {
    const state = {
      ...initState,
      post: { 
        ...initState.post, 
        controls: { ...initState.post.controls, likeUserIds: [10] } 
      },
      user: { ...initState.user, favoritePosts: [2], role: ROLES.USER }
    }
    const store = mockStore(state);
    renderWithProviders(<PostControls />, { store });

    expect(screen.getByAltText('likeFill')).toBeInTheDocument();
    expect(screen.getByAltText('favoriteFill')).toBeInTheDocument();
  });

  it('should show dislikeFill icon', () => {
    const state = {
      ...initState,
      post: { 
        ...initState.post, 
        controls: { ...initState.post.controls, dislikeUserIds: [10] } 
      },
    }
    const store = mockStore(state);
    renderWithProviders(<PostControls />, { store });

    expect(screen.getByAltText('dislikeFill')).toBeInTheDocument();
  });

  it('should update favorite posts after click on icon', () => {
    handleClickIcon('btnFavorite', updateUserFavoritePosts(2));
  });

  it('should update liked posts after click on icon', () => {
    handleClickIcon('btnLike', updatePostLikes(10));
  });

  it('should update disliked posts after click on icon', () => {
    handleClickIcon('btnDislike', updatePostDislikes(10));
  });

  it('should not update liked/disliked posts if user is unauthorized', async () => {
    renderWithProviders(<PostControls />, { store });

    await userEvent.click(screen.getByTestId('btnLike'));
    await userEvent.click(screen.getByTestId('btnDislike'));

    expect(store.dispatch).not.toHaveBeenCalled();
  })

  it('should show modalManage if clicked on pencil icon', () => {
    handleClickControl('pencil', 'modalManage');
  });

  it('should show modalConfirm if clicked on basket icon', () => {
    handleClickControl('basket', 'modalConfirm');
  });

  it('should close modalManage after clicking closeModal()', () => {
    handleCloseModal('pencil', 'modalManage');
  });

  it('should close modalConfirm after clicking closeModal()', () => {
    handleCloseModal('basket', 'modalConfirm');
  });

  it('should call deleteLocalPost if id <= 100', async () => {
    handleDeletePost(2, deletePostInPostPage);
  });

  it('should call deleteLocalPost if id > 100', async () => {
    handleDeletePost(101, deleteLocalPost);
  });
});