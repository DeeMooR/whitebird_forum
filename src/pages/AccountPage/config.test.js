import { getDefaultUser, convertUser } from './config'; // путь к вашему файлу с функциями
import { mockGetDefaultUser } from '../__mocks__/getDefaultUser.mock';
import { mockConvertUser } from '../__mocks__/convertUser.mock';

describe('getDefaultUser', () => {
  it.each(mockGetDefaultUser)(
    'should return correct user object', 
    ({ input, expected }) => {
    const result = getDefaultUser(input);
    expect(result).toEqual(expected);
  })
});

describe('convertUser', () => {
  it.each(mockConvertUser)(
    'should convert user data correctly', 
    ({ inputA, inputB, expected }) => {
    const result = convertUser(inputA, inputB);
    expect(result).toEqual(expected);
  })
});