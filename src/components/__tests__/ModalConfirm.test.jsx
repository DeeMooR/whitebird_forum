import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalConfirm } from '..'; 

const props = {
  action: 'update_account',
  clickApply: jest.fn(),
  closeModal: jest.fn(),
}

describe('ModalConfirm', () => {
  it('should render ModalConfirm with update action', () => {
    render(<ModalConfirm {...props} />);

    expect(screen.getByRole('heading', { name: /изменить/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /изменить/i })).toBeInTheDocument();
    expect(screen.getByText(/оставить/i)).toHaveClass('btnCancel');
  });

  it('should render ModalConfirm with delete action', () => {
    const props = { ...props, action: 'delete_account' }
    render(<ModalConfirm {...props} />);

    expect(screen.getByRole('heading', { name: /удалить/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /удалить/i })).toHaveClass('btnDelete');
    expect(screen.getByText(/оставить/i)).toHaveClass('btnCancel');
  });

  it('should call clickApply by click on button', async () => {
    render(<ModalConfirm {...props} />);

    await userEvent.click(screen.getByRole('button', { name: /изменить/i }));

    expect(props.clickApply).toHaveBeenCalledTimes(1);
  });

  it('should call closeModal by click on button', async () => {
    render(<ModalConfirm {...props} />);

    await userEvent.click(screen.getByRole('button', { name: /оставить/i }));

    expect(props.closeModal).toHaveBeenCalledTimes(1);
  });
});