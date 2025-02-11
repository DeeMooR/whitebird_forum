import { render, screen, waitFor } from '@testing-library/react';
import { Notification } from '..';

const mockedClearMessage = jest.fn();
const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

const renderNotification = (props = {}) => {
  return render(<Notification message="test text" {...props} />);
};

describe('Notification', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render notification', async () => {
    renderNotification({type: 'success'});

    await waitFor(() => 
      expect(screen.getByRole('status')).toBeInTheDocument()
    );

    const container = screen.getByRole('status');
    expect(container).toHaveClass('notification');
    expect(container).toHaveClass('isOpen');
    expect(container).toHaveClass('isSuccess');

    expect(screen.getByText('test text')).toBeInTheDocument();
    expect(screen.getByText('✔')).toBeInTheDocument();
    expect(screen.getByAltText('close')).toBeInTheDocument();
  });
 
  it('should render notification with error', async () => {
    renderNotification({type: 'error'});

    await waitFor(() => 
      expect(screen.getByRole('status')).toBeInTheDocument()
    );

    const container = screen.getByRole('status');
    expect(container).toHaveClass('notification');
    expect(container).toHaveClass('isOpen');
    expect(container).toHaveClass('isError');
    expect(screen.getByText('!')).toBeInTheDocument();
  });

  it('should render notification default time', async () => {
    renderNotification({type: 'success'});

    await waitFor(() => 
      expect(screen.queryByRole('status')).not.toBeInTheDocument(), {timeout: 2200}
    );
  });

  it('should render notification with displayTime, clearMessage', async () => {
    const delay = 1000;
    renderNotification({type: 'success', displayTime: delay, clearMessage: mockedClearMessage });

    await waitFor(() => 
      expect(screen.getByRole('status')).toBeInTheDocument()
    );
    
    await waitFor(() => 
      expect(screen.queryByRole('status')).not.toBeInTheDocument(), {timeout: delay + 200}
    );

    expect(mockedClearMessage).toHaveBeenCalledTimes(1);
  });

  it('should clear timeout on unmount', () => {
    const { unmount } = renderNotification({type: 'success'});

    unmount();
    
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});