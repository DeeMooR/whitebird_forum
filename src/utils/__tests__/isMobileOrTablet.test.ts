import { isMobileOrTablet } from '..';
import { mockMobileOrTablet } from '../__mocks__/mobileOrTablet.mock';

const userAgentSpy = jest.spyOn(navigator, 'userAgent', 'get');

describe('isMobileOrTablet', () => {
  it.each(mockMobileOrTablet)('should return $expected for $inputB user agent', ({inputA, inputB, expected}) => {
    userAgentSpy.mockReturnValueOnce(inputA);

    expect(isMobileOrTablet()).toBe(expected);
  });
});