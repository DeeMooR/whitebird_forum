import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import { renderWithProviders } from 'src/utils/testing';
import { clearUserMessages } from 'src/redux/slices';
import { PageTemplate } from '..';

const props = { children: 'Children' };

const initState = {
  user: {
    successMessage: null
  }
}

const mockStore = configureMockStore();
const store = mockStore(initState);
store.dispatch = jest.fn();

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock('src/components', () => ({
  ...jest.requireActual('src/components'),
  Header: () => (
    <div data-testId="mockHeader"></div>
  ),
  Footer: () => (
    <div data-testId="mockFooter"></div>
  ),
  PostsMessages: () => (
    <div data-testId="mockPostsMessages"></div>
  ),
}));

describe('PageTemplate', () => {
  it('should render PageTemplate', () => {
    renderWithProviders(<PageTemplate {...props} />, { store });

    expect(screen.getByText(props.children)).toHaveClass('pageTemplate__content');
    expect(screen.getByTestId('mockHeader')).toBeInTheDocument();
    expect(screen.getByTestId('mockFooter')).toBeInTheDocument();
    expect(screen.queryByTestId('mockNotification')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mockPostsMessages')).not.toBeInTheDocument();
  });

  it('should render PageTemplate with isCenter, notShowCrumbs, showScroll, showPostsMessages', () => {
    const props = { 
      children: 'Children', 
      isCenter: true, 
      notShowCrumbs: false, 
      showScroll: true,
      showPostsMessages: true 
    };
    renderWithProviders(<PageTemplate {...props} />, { store });

    expect(screen.getByText(props.children)).toHaveClass('pageTemplate__content');
    expect(screen.getByText(props.children)).toHaveClass('isCenter');
    expect(screen.getByText('Форум /')).toBeInTheDocument();
    expect(screen.getByTestId('mockPostsMessages')).toBeInTheDocument();
    expect(document.body.style.overflowY).toBe('scroll');
  })

  it('should show Notification and handle clearMessages', async () => {
    const state = {
      user: { successMessage: 'success' }
    }
    const store = mockStore(state);
    store.dispatch = jest.fn();
    renderWithProviders(<PageTemplate {...props} />, { store });

    expect(screen.getByText('success')).toBeInTheDocument();
    
    await userEvent.click(screen.getByAltText('close'));
    expect(store.dispatch).toHaveBeenCalledWith(clearUserMessages());
  })
  
  it('should move to /forum after click on crumbs', async () => {
    const props = { children: 'Children', notShowCrumbs: false };
    renderWithProviders(<PageTemplate {...props} />, { store });

    await userEvent.click(screen.getByText('Форум /'));
    expect(mockedNavigate).toHaveBeenCalledWith('/forum');
  })
});