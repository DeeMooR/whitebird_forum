import { screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { getPosts } from 'src/redux/slices';
import { FavoritePostsPage } from '..';

const initState = {
  user: {
    favoritePosts: [1, 2]
  },
  posts: {
    posts: [{ id: 1 }, { id: 2 }, { id: 3 }]
  }
}

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('src/components', () => ({
  ...jest.requireActual('src/components'),
  ListOfPosts: (props) => (
    <div 
      data-posts={JSON.stringify(props.posts)} 
      data-testId="mockListOfPosts"
    ></div>
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

describe('FavoritePostsPage', () => {
  it('should render FavoritePostsPage', () => {
    const displayedPosts = [{ id: 1 }, { id: 2 }];
    renderWithProviders(<FavoritePostsPage />, { store });

    expect(store.dispatch).toHaveBeenCalledWith(getPosts());
    expect(screen.getByRole('heading')).toBeInTheDocument();

    const elementProps = screen.getByTestId('mockListOfPosts').dataset;
    expect(JSON.parse(elementProps.posts)).toEqual(displayedPosts);
  });
});