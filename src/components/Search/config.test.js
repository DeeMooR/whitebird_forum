import { getSearchAction } from './config';
import { getUserByUserData, getUsers, getPostsByUser, getPosts } from 'src/redux/slices';

jest.mock('src/redux/slices', () => ({
  getUserByUserData: jest.fn(),
  getUsers: jest.fn(),
  getPostsByUser: jest.fn(),
  getPosts: jest.fn(),
}));

describe('getSearchAction', () => {
  it('should return getUserByUserData action if search is provided for users', () => {
    const search = 'testUser';
    getSearchAction.users(search);
    expect(getUserByUserData).toHaveBeenCalledWith(search);
  });

  it('should return getUsers action if search is not provided for users', () => {
    const search = '';
    getSearchAction.users(search);
    expect(getUsers).toHaveBeenCalled();
  });

  it('should return getPostsByUser action if search is provided for posts', () => {
    const search = 'testPost';
    getSearchAction.posts(search);
    expect(getPostsByUser).toHaveBeenCalledWith(search);
  });

  it('should return getPosts action if search is not provided for posts', () => {
    const search = '';
    getSearchAction.posts(search);
    expect(getPosts).toHaveBeenCalled();
  });
});