import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalTemplate } from '..'; 

const props = {
  closeModal: jest.fn(),
  children: 'Modal content',
}

describe('ModalTemplate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render ModalTemplate', () => {
    render(<ModalTemplate {...props} />);

    expect(screen.getByAltText('cross')).toBeInTheDocument();
    expect(screen.getByText(props.children)).toBeInTheDocument();
  });

  it('should render ModalTemplate with className', () => {
    const className = 'testClassName';
    render(<ModalTemplate {...props} className={className} />);

    const element = screen.getByRole('dialog');
    expect(element).toHaveClass('modal');
    expect(element).toHaveClass(className);
  });

  it('should call closeModal by click on background', async () => {
    render(<ModalTemplate {...props} />);

    await userEvent.click(screen.getByTestId('modalBackground'));

    expect(props.closeModal).toHaveBeenCalledTimes(1);
  });

  it('should do not call closeModal by click inside modal', async () => {
    render(<ModalTemplate {...props} />);

    await userEvent.click(screen.getByRole('dialog'));

    expect(props.closeModal).not.toHaveBeenCalled();
  });
});