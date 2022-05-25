import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './components/AppRouter';
import { Provider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import Alert from '@mui/material/Alert';
import store from './redux/store';
import './styles/base.scss'

const alertOptions = {
  position: positions.BOTTOM_LEFT,
  timeout: 5000,
  transition: transitions.FADE
}

const AlertTemplate = ({ style, options, message, close }) => (
  <div styles={style}>
    <Alert severity={options.type}>
      {message}
    </Alert>
  </div>
)

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <AppRouter />
    </AlertProvider>
  </Provider>,
  document.getElementById('root'),
);