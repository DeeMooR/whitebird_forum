import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { setSwapPosts } from 'src/redux/slices';
import { PostMoving } from '..';

const mockStore = configureMockStore();
const store = mockStore({});
store.dispatch = jest.fn();

const props = {
  postId: 10,
  movingPostsId: {
    upPostId: 11,
    downPostId: 9,
  }
}

const propsWithEmptyMoving = {
  postId: 10,
  movingPostsId: { upPostId: null, downPostId: null }
}

describe('PostMoving', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should render PostMoving', () => {
    renderWithProviders(<PostMoving {...props} />, { store });

    expect(screen.getByAltText('arrowUp')).toBeInTheDocument();
    expect(screen.getByAltText('arrowDown')).toBeInTheDocument();
  });

  it('should render PostMoving with disabled icons', () => {
    renderWithProviders(<PostMoving {...propsWithEmptyMoving} />, { store });

    expect(screen.getByAltText('arrowUp')).toHaveClass('card__btnUp');
    expect(screen.getByAltText('arrowUp')).toHaveClass('isDisabled');
    expect(screen.getByAltText('arrowDown')).toHaveClass('card__btnDown');
    expect(screen.getByAltText('arrowDown')).toHaveClass('isDisabled');
  });

  it('should swap post with up after clicking arrowUp', async () => {
    renderWithProviders(<PostMoving {...props} />, { store });

    await userEvent.click(screen.getByAltText('arrowUp'));

    expect(store.dispatch).toHaveBeenCalledWith(setSwapPosts([10, 11]));
  });

  it('should swap post with down after clicking arrowDown', async () => {
    renderWithProviders(<PostMoving {...props} />, { store });

    await userEvent.click(screen.getByAltText('arrowDown'));

    expect(store.dispatch).toHaveBeenCalledWith(setSwapPosts([10, 9]));
  });

  it('should not swap posts if icon isDisabled', async () => {
    renderWithProviders(<PostMoving {...propsWithEmptyMoving} />, { store });

    await userEvent.click(screen.getByAltText('arrowUp'));
    await userEvent.click(screen.getByAltText('arrowDown'));

    expect(store.dispatch).not.toHaveBeenCalled();
  })
});