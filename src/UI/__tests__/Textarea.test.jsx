import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Textarea } from '..';

const renderTextarea = (props = {}) => {
  const register = jest.fn();
  return render(<Textarea id="test" register={register} {...props} />);
};

describe('Textarea', () => {
  it('should render textarea', () => {
    renderTextarea();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render textarea with a title', () => {
    renderTextarea({ title: 'Test Title' });
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render textarea with a placeholder', () => {
    renderTextarea({ placeholder: 'Test Placeholder' });
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should render textarea with a disabled state', () => {
    renderTextarea({ disabled: true });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should render textarea with length', async () => {
    const maxLength = 50;
    renderTextarea({ max: maxLength });

    const element = screen.getByRole('textbox');
    expect(element).toHaveAttribute('maxLength', maxLength.toString());
    expect(screen.getByText('0/50')).toHaveClass('textareaBlock__count');

    await userEvent.type(element, '123');

    expect(screen.getByText('3/50')).toBeInTheDocument();
  });

  it('should render input with an error message', () => {
    renderTextarea({ error: 'Test Error' });
    expect(screen.getByRole('textbox')).toHaveClass('warning');
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByAltText('warning')).toBeInTheDocument();
  });
});