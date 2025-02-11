import { screen, waitFor } from '@testing-library/react';
import { renderWithMemoryRouter } from 'src/utils/testing';
import { ScrollToTop } from '..';

window.scrollTo = jest.fn();

describe('ScrollToTop', () => {
  it('should scroll to top', () => {
    renderWithMemoryRouter(<ScrollToTop />);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});