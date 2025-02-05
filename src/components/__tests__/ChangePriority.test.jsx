import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { updatePostPriority } from 'src/redux/slices';
import { ChangePriority } from '..'; 

const props = {
  postId: 1,
  defaultValue: 2,
}

const mockStore = configureMockStore();
const store = mockStore({});
store.dispatch = jest.fn();

describe('Card', () => {
  it('should render ChangePriority', () => {
    renderWithProviders(<ChangePriority {...props} />, { store });

    expect(screen.getByRole('spinbutton')).toHaveValue(2);
    expect(screen.getByAltText('arrowUp')).toBeInTheDocument();
    expect(screen.getByAltText('arrowDown')).toBeInTheDocument();
  });

  it('should render ChangePriority with hidden arrowUp', () => {
    const props = { ...props, defaultValue: 1 };
    renderWithProviders(<ChangePriority {...props} />, { store });

    const element = screen.getByAltText('arrowDown');
    expect(element).toHaveClass('changePriority__contol');
    expect(element).toHaveClass('hidden');
  });

  it('should render ChangePriority with hidden arrowDown', () => {
    const props = { ...props, defaultValue: 10 };
    renderWithProviders(<ChangePriority {...props} />, { store });

    const element = screen.getByAltText('arrowUp');
    expect(element).toHaveClass('changePriority__contol');
    expect(element).toHaveClass('hidden');
  });

  it('should update priority after click by arrowUp', async () => {
    renderWithProviders(<ChangePriority {...props} />, { store });

    const element = screen.getByRole('spinbutton');
    expect(element).toHaveValue(2);

    await userEvent.click(screen.getByAltText('arrowUp'));
    
    await waitFor(() => 
      expect(element).toHaveValue(3)
    );
    expect(store.dispatch).toHaveBeenCalledWith(updatePostPriority({ postId: 1, priority: 2 }));
  });

  it('should update priority after click by arrowDown', async () => {
    renderWithProviders(<ChangePriority {...props} />, { store });

    const element = screen.getByRole('spinbutton');
    expect(element).toHaveValue(2);

    await userEvent.click(screen.getByAltText('arrowDown'));
    
    await waitFor(() => 
      expect(element).toHaveValue(1)
    );
    expect(store.dispatch).toHaveBeenCalledWith(updatePostPriority({ postId: 1, priority: 1 }));
  });

  it('should save current priority after click by hidden arrowUp', async () => {
    const props = { ...props, defaultValue: 10 };
    renderWithProviders(<ChangePriority {...props} />, { store });

    const element = screen.getByRole('spinbutton');
    expect(element).toHaveValue(10);

    await userEvent.click(screen.getByAltText('arrowUp'));

    expect(element).toHaveValue(10);
  });

  it('should save current priority after click by hidden arrowDown', async () => {
    const props = { ...props, defaultValue: 1 };
    renderWithProviders(<ChangePriority {...props} />, { store });

    const element = screen.getByRole('spinbutton');
    expect(element).toHaveValue(1);

    await userEvent.click(screen.getByAltText('arrowDown'));

    expect(element).toHaveValue(1);
  });
});
