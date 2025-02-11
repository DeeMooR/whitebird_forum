import { screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { getPosts } from 'src/redux/slices';
import { ROLES } from 'src/config';
import { ForumPage } from '..';

const initState = {
  user: {
    role: ROLES.ADMIN
  },
  posts: {
    search: null,
    posts: [
      { id: 1, priority: 1 }, 
      { id: 2, priority: 3 }, 
      { id: 3, priority: 2 }
    ]
  }
}

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('src/components', () => ({
  ...jest.requireActual('src/components'),
  Search: () => <div data-testId="mockSearch"></div>,
  ListOfPosts: (props) => (
    <div 
      data-testId="mockListOfPosts"
      data-posts={JSON.stringify(props.posts)} 
      data-showpriority={props.showPriority}
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

describe('ForumPage', () => {
  it('should render ForumPage', () => {
    const sortedPosts = [
      { id: 2, priority: 3 }, 
      { id: 3, priority: 2 },
      { id: 1, priority: 1 } 
    ];
    renderWithProviders(<ForumPage />, { store });

    expect(store.dispatch).toHaveBeenCalledWith(getPosts());
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByTestId('mockSearch')).toBeInTheDocument();
    expect(screen.getByText('Приоритет')).toBeInTheDocument();
    expect(screen.getByText('Передвижение')).toBeInTheDocument();

    const elementProps = screen.getByTestId('mockListOfPosts').dataset;
    expect(JSON.parse(elementProps.posts)).toEqual(sortedPosts);
    expect(elementProps.showpriority).toBe('true');
  });

  it('should render without showPriority if search is not empty', () => {
    const state = {
      ...initState, 
      posts: { ...initState.posts, search: 'test' }
    }
    const store = mockStore(state);
    renderWithProviders(<ForumPage />, { store });

    expect(screen.queryByText('Приоритет')).not.toBeInTheDocument();
    expect(screen.queryByText('Передвижение')).not.toBeInTheDocument();

    const elementProps = screen.getByTestId('mockListOfPosts').dataset;
    expect(elementProps.showpriority).toBe('false');
  });

  it('should render without showPriority if user is not admin', () => {
    const state = {
      ...initState, 
      user: { ...initState.user, role: ROLES.USER }
    }
    const store = mockStore(state);
    renderWithProviders(<ForumPage />, { store });

    expect(screen.queryByText('Приоритет')).not.toBeInTheDocument();
    expect(screen.queryByText('Передвижение')).not.toBeInTheDocument();

    const elementProps = screen.getByTestId('mockListOfPosts').dataset;
    expect(elementProps.showpriority).toBe('false');
  });
});