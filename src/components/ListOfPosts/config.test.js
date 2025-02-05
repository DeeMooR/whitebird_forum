import { getMovingPostsId } from './config';
import { mockMovingPostsId } from '../__mocks__';

describe('getMovingPostsId', () => {
  it.each(mockMovingPostsId)
  ('should return ids of neighboring posts', (inputA, inputB, expected) => {
    const result = getMovingPostsId(inputA, inputB);
    expect(result).toEqual(expected);
  })
});