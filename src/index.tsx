import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { ScrollToTop } from './components';
import store from './redux/store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Router>
    <ScrollToTop />
    <Provider store={store}>
        <App />
    </Provider>
  </Router>
);
