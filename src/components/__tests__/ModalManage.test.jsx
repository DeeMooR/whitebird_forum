import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { ModalManage } from '..'; 

const props = {
  id: 'post_update',
  type: 'post',
  action: 'update',
  closeModal: jest.fn(),
}

let mockData = {};

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: () => ({
    ...jest.requireActual('react-hook-form').useForm(),
    handleSubmit: jest.fn((fn) => (e) => {
      e.preventDefault();
      fn(mockData);
    }),
    setError: jest.fn(),
  }),
}));

const mockStore = configureMockStore();
const store = mockStore({});
store.dispatch = jest.fn();

describe('ModalManage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render ModalManage with update action', () => {
    renderWithProviders(<ModalManage {...props} />, { store });

    expect(screen.getByRole('heading', { name: /редактирование/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /изменить/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отмена/i })).toBeInTheDocument();
    expect(screen.getAllByTestId('inputBlock')).toHaveLength(1);
    expect(screen.getAllByTestId('textareaBlock')).toHaveLength(1);
  });

  it('should render ModalManage with add action', () => {
    const props = {
      id: 'posts_add',
      type: 'post',
      action: 'add',
      closeModal: jest.fn(),
    }
    renderWithProviders(<ModalManage {...props} />, { store });

    expect(screen.getByRole('heading', { name: /создание/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /добавить/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /отмена/i })).toBeInTheDocument();
  });

  it('should call closeModal by click on button', async () => {
    renderWithProviders(<ModalManage {...props} />, { store });

    await userEvent.click(screen.getByRole('button', { name: /отмена/i }));

    expect(props.closeModal).toHaveBeenCalledTimes(1);
  });

  it('should send form and closeModal', async () => {
    mockData = { title: 'Title', body: 'Body' };
    renderWithProviders(<ModalManage {...props} />, { store });

    await userEvent.type(screen.getByPlaceholderText('Заголовок'), mockData.title);
    await userEvent.type(screen.getByPlaceholderText('Текст'), mockData.body);

    await userEvent.click(screen.getByRole('button', { name: /изменить/i }));

    expect(store.dispatch).toHaveBeenCalled();
    expect(props.closeModal).toHaveBeenCalledTimes(1);
  });

  it('should not send form if data is incorrect', async () => {
    mockData = { title: 'Title', body: '' };
    renderWithProviders(<ModalManage {...props} />, { store });

    await userEvent.type(screen.getByPlaceholderText('Заголовок'), mockData.title);

    await userEvent.click(screen.getByRole('button', { name: /изменить/i }));
    
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(props.closeModal).not.toHaveBeenCalled();
  });
});