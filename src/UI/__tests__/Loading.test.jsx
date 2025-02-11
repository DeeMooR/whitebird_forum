import { render, screen, waitFor } from '@testing-library/react';
import { Loading } from '..';

const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

describe('Loading', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  test('should render Loading', async () => {
    render(<Loading />);
    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument());
    expect(screen.getByRole('status')).toHaveClass('loading');
  });

  test('should render Loading with delay', async () => {
    const delay = 2000;
    render(<Loading delay={delay} />);

    expect(screen.queryByRole('status')).toBeNull();

    await waitFor(() => 
      expect(screen.getByRole('status')).toBeInTheDocument(), { timeout: delay + 500 }
    );
  });

  it('should clear timeout on unmount', () => {
    const { unmount } = render(<Loading />);

    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});