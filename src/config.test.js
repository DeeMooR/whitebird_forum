import { checkEmptyValues } from './config';

const tests = [
  [{ title: 'text', body: 'text' }, ['title', 'body'], true],
  [{ title: 'text' }, ['title'], true],
  [{ title: 'text', body: '' }, ['title', 'body'], false],
  [{ title: 'text', body: 'text', description: 'text' }, ['title', 'body'], true],
];

const mockedSetError = jest.fn();

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    ...jest.requireActual('react-hook-form').useForm(),
    setError: mockedSetError,
  }),
}));

describe('checkEmptyValues', () => {
  it.each(tests)('should check that $inputB includes in $inputA', (inputA, inputB, expected) => {
    const result = checkEmptyValues(inputA, inputB, mockedSetError);
    expect(result).toBe(expected);
  })
});