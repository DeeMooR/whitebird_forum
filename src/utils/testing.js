import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";

export const renderWithProviders = (component, { store, ...options } = {}) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter {...options}>
      <Provider store={store}>
        {children}
      </Provider>
    </MemoryRouter>
  );

  return render(component, { wrapper: Wrapper, ...options });
};

export const renderWithMemoryRouter = (component, { ...options } = {}) => {
  const Wrapper = ({ children }) => (
    <MemoryRouter {...options}>
      {children}
    </MemoryRouter>
  );

  return render(component, { wrapper: Wrapper, ...options });
};