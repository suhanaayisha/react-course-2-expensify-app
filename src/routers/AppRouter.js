import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpExpensePage from '../components/HelpExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import { LoginPage, SignupPage } from '../components/AuthPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <PublicRoute path='/login' component={LoginPage}/>
            <PublicRoute path='/signup' component={SignupPage}/>
            <PrivateRoute path='/' component={ExpenseDashboardPage} exact={true}/>
            <PrivateRoute path='/create' component={AddExpensePage}/>
            <PrivateRoute path='/edit/:id' component={EditExpensePage}/>
            <PrivateRoute path='/help' component={HelpExpensePage}/>
            <Route component={NotFoundPage}/>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
