import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './rootReducer.js';
import createSocketMiddleware from './socketMiddleware.js';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(createSocketMiddleware())));


export default store;