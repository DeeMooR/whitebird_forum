import { getUsernameById, getTextPluralComments } from './config';

const users = [{ id: 1, username: 'Alice' }];

describe('getUsernameById', () => {
  it('should return username by id', () => {
    const res = getUsernameById(users, 1);
    expect(res).toBe('Alice');
  });

  it('should return null if user does not exist', () => {
    const res = getUsernameById(users, 2);
    expect(res).toBeNull();
  });
});

describe('getTextPluralComments', () => {
  it.each([
    {inputA: 1, expected: 'ответ'},
    {inputA: 2, expected: 'ответа'},
    {inputA: 4, expected: 'ответа'},
    {inputA: 5, expected: 'ответов'},
    {inputA: 10, expected: 'ответов'},
    {inputA: 11, expected: 'ответов'},
    {inputA: 0, expected: 'ответов'},
  ])('should $inputA equals $expected', ({inputA, expected}) => {
    const result = getTextPluralComments(inputA);
    expect(result).toBe(expected);
  })
});