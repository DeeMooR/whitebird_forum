import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { ListOfPosts, Card } from '..';

const props = {
  posts: [
    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, 
    { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
  ],
  emptyText: 'No posts',
}

const initialState = {
  posts: {
    isLoading: false,
  },
  local: {
    isLoading: false,
  }
};

const mockStore = configureMockStore();
const store = mockStore(initialState);

jest.mock('..', () => ({
  ...jest.requireActual('..'),
  Card: (props) => (
    <div
      data-testid="mockCard"
      data-showcontrols={props.showControls}
      data-showpriority={props.showPriority}
      data-movingpostsid={JSON.stringify(props.movingPostsId)}
    ></div>
  ),
}));

describe('ListOfPosts', () => {
  it('should render ListOfPosts', () => {
    renderWithProviders(<ListOfPosts {...props} />, { store });

    expect(screen.getAllByTestId('mockCard')).toHaveLength(12);
    });

  it('should transmit props to Card', () => {
    renderWithProviders(<ListOfPosts {...props} showControls showPriority  />, { store });

    const elementProps = screen.getAllByTestId('mockCard')[0].dataset;
    expect(elementProps.showcontrols).toBe('true');
    expect(elementProps.showpriority).toBe('true');
    expect(JSON.parse(elementProps.movingpostsid)).toEqual({ upPostId: null, downPostId: 2 });
  });

  it('should display Loading if isLoading is true', async () => {
    const store = mockStore({ ...initialState, posts: { isLoading: true } });
    renderWithProviders(<ListOfPosts {...props} />, { store });
  
    await waitFor(() => {
      expect(screen.getByRole('status')).toBeInTheDocument()
    });
  });

  it('should display empty text when there are no posts', () => {
    const props = { posts: [], emptyText: 'No posts' };
    renderWithProviders(<ListOfPosts {...props} />, { store });

    expect(screen.getByText('No posts')).toBeInTheDocument();
    expect(screen.queryByTestId('mockCard')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should display withLimit and button', () => {
    renderWithProviders(<ListOfPosts {...props} withLimit />, { store });
  
    expect(screen.getAllByTestId('mockCard')).toHaveLength(10);
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  it('should update limit after click by button', async () => {
    renderWithProviders(<ListOfPosts {...props} withLimit />, { store });
  
    expect(screen.getAllByTestId('mockCard')).toHaveLength(10);
  
    await userEvent.click(screen.getByRole('button'));
  
    expect(screen.getAllByTestId('mockCard')).toHaveLength(12);
  });
});