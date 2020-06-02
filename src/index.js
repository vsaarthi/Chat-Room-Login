import React from 'react';
import ReactDOM from 'react-dom';
import Login from './LoginApplication/Login';
import welcome from './LoginApplication/welcome';
import ChatBox from './ChatApplication/ChatBox';

import { Route, Switch, HashRouter } from "react-router-dom";
import { createHashHistory } from 'history'

import { Provider } from 'react-redux'
import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);
const history = createHashHistory();

ReactDOM.render(
    <HashRouter history= {history}>
        <Provider store={store}>
                <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route  path="/welcome" component={welcome}/>
                        <Route  path="/chat" component={ChatBox}/>

                </Switch>
        </Provider>
    </HashRouter>, document.getElementById('app'));