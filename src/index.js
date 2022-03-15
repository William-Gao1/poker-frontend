import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './components/AppRouter';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/base.scss'

ReactDOM.render(
  <Provider store={store}>
      <AppRouter />
  </Provider>,
  document.getElementById('root'),
);