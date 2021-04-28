import {Switch, Route, Router} from 'react-router-dom';
import React from 'react';
import history from './history';
import {LoginPage} from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

export default function Routers() {
    return (
        <Router history={history} >
            <Switch>
                <Route  exact={true} path='/login' component={LoginPage}/>
                <Route  exact={true} path='/' component={HomePage}/>
            </Switch>
        </Router>
    )
}
