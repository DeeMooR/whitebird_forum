import { render, screen } from '@testing-library/react';
import { Input } from '..';

const renderInput = (props = {}) => {
  const register = jest.fn();
  return render(<Input id="test" register={register} type="text" {...props} />);
};

describe('Input', () => {
  it('should render input', () => {
    renderInput();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render input with a title', () => {
    renderInput({ title: 'Test Title' });
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render input with a placeholder', () => {
    renderInput({ placeholder: 'Test Placeholder' });
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('should render input with a disabled state', () => {
    renderInput({ disabled: true });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should render input with an error message', () => {
    renderInput({ error: 'Test Error' });
    expect(screen.getByRole('textbox')).toHaveClass('warning');
    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.getByAltText('warning')).toBeInTheDocument();
  });

  it('should render input with a custom className', () => {
    renderInput({ classNameInput: 'custom' });
    expect(screen.getByRole('textbox')).toHaveClass('custom');
  });
});