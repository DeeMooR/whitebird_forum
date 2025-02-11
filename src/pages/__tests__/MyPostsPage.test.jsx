import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { getMyPosts } from 'src/redux/slices';
import { MyPostsPage } from '..';

const initState = {
  user: {
    user: { id: 1 }
  },
  posts: {
    myPosts: [{id: 3}, {id: 4}]
  },
  local: {
    posts: [{id: 1}, {id: 2}]
  }
}

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock('src/components', () => ({
  ...jest.requireActual('src/components'),
  ListOfPosts: (props) => (
    <div 
      data-testId="mockListOfPosts"
      data-posts={JSON.stringify(props.posts)} 
    ></div>
  ),
  ModalManage: (props) => (
    <div data-testid="mockModalManage">
      <button onClick={props.closeModal}>Close</button>
    </div>
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

describe('MyPostsPage', () => {
  it('should render MyPostsPage', () => {
    const allPosts = [{id: 1}, {id: 2}, {id: 3}, {id: 4}]
    renderWithProviders(<MyPostsPage />, { store });

    expect(store.dispatch).toHaveBeenCalledWith(getMyPosts(1));
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Написать пост' })).toBeInTheDocument();

    const elementProps = screen.getByTestId('mockListOfPosts').dataset;
    expect(JSON.parse(elementProps.posts)).toEqual(allPosts);
  });

  it('should open and hidden modalManage', async () => {
    renderWithProviders(<MyPostsPage />, { store });

    await userEvent.click(screen.getByRole('button', { name: 'Написать пост' }));
    expect(screen.getByTestId('mockModalManage')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByTestId('mockModalManage')).not.toBeInTheDocument();
  });
});