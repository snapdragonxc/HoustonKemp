import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; //<--- Monitor state change on the console
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/reducers';
//<--- Pages --->
import App from './app.js';
import Posts from './components/posts.js';
import Post from './components/post.js';
import Add from './components/add.js';
import Edit from './components/edit.js';
//
const store = createStore(
    reducers, 
    {},
  //  applyMiddleware(thunk, logger)
    applyMiddleware(thunk)
);
//
const routesArray = [
    <Route key={1} path={'/'} exact={true} component={ Posts } />,  
    <Route key={2} path={'/posts/:page'} component={ Posts } />,     
    <Route key={3} path={'/post/:filename'} component={ Post } />, 
    <Route key={4} path={'/edit/:filename'} component={ Edit } />, 
    <Route key={5} path={'/add'} component={ Add } />,
];
// <--- Render App --->
ReactDOM.render (
    <Provider store={store}>
        <BrowserRouter >   
            <App routes={ routesArray } />
        </BrowserRouter>
    </Provider>
    , document.getElementById('app')
)