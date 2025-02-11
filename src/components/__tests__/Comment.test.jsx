import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { deleteComment } from 'src/redux/slices';
import { Comment } from '..'; 

const obj = {
  id: 4,
  postId: 1,
  email: 'test@gmail.com',
  name: 'Name',
  body: 'Test text',
}

const initialState = {
  user: {
    user: {
      email: 'test@gmail.com',
      role: 'admin'
    }
  }
};


const mockStore = configureMockStore();
const store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Comment', () => {
  it('should render Comment', () => {
    renderWithProviders(<Comment obj={obj} />, { store });

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('test@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Test text')).toBeInTheDocument();
    expect(screen.getByAltText('pencil')).toBeInTheDocument();
    expect(screen.getByAltText('basket')).toBeInTheDocument();
  });

  it('should render Comment without buttons control', () => {
    const obj = { ...obj, email: 'new@gmail.com'}
    renderWithProviders(<Comment obj={obj} />, { store });

    expect(screen.getByText('new@gmail.com')).toBeInTheDocument();
    expect(screen.queryByAltText('pencil')).not.toBeInTheDocument();
    expect(screen.queryByAltText('basket')).not.toBeInTheDocument();
  });

  it('should render Comment with modalUpdate', async  () => {
    renderWithProviders(<Comment obj={obj} />, { store });
    
    expect(screen.queryByTestId('modalManage')).not.toBeInTheDocument();

    await userEvent.click(screen.getByAltText('pencil'));

    await waitFor(() => 
      expect(screen.getByTestId('modalManage')).toBeInTheDocument()
    );
  });

  it('should render Comment with modalDelete', async () => {
    renderWithProviders(<Comment obj={obj} />, { store });
    
    expect(screen.queryByTestId('modalConfirm')).not.toBeInTheDocument();

    await userEvent.click(screen.getByAltText('basket'));

    await waitFor(() => 
      expect(screen.getByTestId('modalConfirm')).toBeInTheDocument()
    );
  });

  it('should delete Comment after click by modalDelete', async () => {
    renderWithProviders(<Comment obj={obj} />, { store });

    await userEvent.click(screen.getByAltText('basket'));

    await waitFor(() => 
      expect(screen.getByTestId('modalConfirm')).toBeInTheDocument()
    );

    const deleteButton = screen.getByRole('button', { name: /удалить/i });
    await userEvent.click(deleteButton);

    expect(store.dispatch).toHaveBeenCalledWith(deleteComment(4));
  });

  it('should close modalUpdate after click by closeModal', async () => {
    renderWithProviders(<Comment obj={obj} />, { store });
   
    await userEvent.click(screen.getByAltText('pencil'));

    await waitFor(() => 
      expect(screen.getByTestId('modalManage')).toBeInTheDocument()
    );

    const closeButton = screen.getByAltText('cross');
    await userEvent.click(closeButton);

    expect(screen.queryByTestId('modalManage')).not.toBeInTheDocument()
  });

  it('should close modalConfirm after click by closeModal', async () => {
    renderWithProviders(<Comment obj={obj} />, { store });
   
    await userEvent.click(screen.getByAltText('basket'));

    await waitFor(() => 
      expect(screen.getByTestId('modalConfirm')).toBeInTheDocument()
    );

    const closeButton = screen.getByAltText('cross');
    await userEvent.click(closeButton);

    expect(screen.queryByTestId('modalConfirm')).not.toBeInTheDocument()
  });
});
