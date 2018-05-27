import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import allReducers from './reducers';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
export const store = createStore(
    allReducers,
    applyMiddleware(thunk)
);

ReactDOM.render( <Provider store={store}>
        <App />
        </Provider>
    , document.getElementById('root'));
registerServiceWorker();
