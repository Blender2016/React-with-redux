import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import registerReducer from "./store/reducers/register";
import loginReducer from "./store/reducers/login";
import forgetPasswordReducer from "./store/reducers/forgetPassword";
import resetPasswordReducer from "./store/reducers/resetPassword";
import {BrowserRouter} from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer =  combineReducers({
    register:registerReducer,
    login:loginReducer,
    forgetPassword:forgetPasswordReducer,
    resetPassword:resetPasswordReducer
});
const store = createStore(rootReducer ,
    composeEnhancers(
        applyMiddleware(thunk)
    ));

const app=(
   <Provider store={store}>
        <BrowserRouter>
           <App/>
        </BrowserRouter>
   </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
