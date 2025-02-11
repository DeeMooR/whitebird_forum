import { hiddenScroll, displayScroll } from '..';
import * as func from '../isMobileOrTablet';

const isMobileOrTabletSpy = jest.spyOn(func, 'isMobileOrTablet');

describe('hiddenScroll', () => {
  beforeEach(() => {
    document.body.style.overflowY = '';
    document.body.style.padding = '';
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hide scroll and set padding', () => {
    document.body.style.overflowY = 'scroll';
    isMobileOrTabletSpy.mockReturnValueOnce(false);

    expect(hiddenScroll()).toBe('scroll');
    expect(document.body.style.overflowY).toBe('hidden');
    expect(document.body.style.padding).toBe('0px 17px 0px 0px');
  });

  it('should not add padding if isMobileOrTablet returns true', () => {
    document.body.style.overflowY = 'scroll';
    isMobileOrTabletSpy.mockReturnValueOnce(true);

    hiddenScroll();
    expect(document.body.style.padding).toBe('');
  });

  it('should not add padding if previous scroll type is not "scroll"', () => {
    document.body.style.overflowY = 'auto';
    isMobileOrTabletSpy.mockReturnValueOnce(false);

    hiddenScroll();
    expect(document.body.style.padding).toBe('');
  });
});

describe('displayScroll', () => {
  beforeEach(() => {
    document.body.style.overflowY = '';
    document.body.style.padding = '';
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set scroll type', () => {
    isMobileOrTabletSpy.mockReturnValueOnce(true);

    displayScroll('auto');
    expect(document.body.style.overflowY).toBe('auto');
  });

  it('should set padding 0 if isMobileOrTablet returns false', () => {
    isMobileOrTabletSpy.mockReturnValueOnce(false);

    expect(document.body.style.padding).toBe('');
  });
});