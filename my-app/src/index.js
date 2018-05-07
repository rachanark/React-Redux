import React from 'react';
import ReactDOM from 'react-dom';
//import {createStore} from 'redux';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import promise from 'redux-promise';
// import createLogger from 'redux-logger';
import App from './App'

// const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk)
);

ReactDOM.render( <Provider store={store}>
        <App />
        </Provider>
    , document.getElementById('root'));
registerServiceWorker();
