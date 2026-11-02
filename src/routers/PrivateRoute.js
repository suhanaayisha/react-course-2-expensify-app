import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

// Only for signed-in users; everyone else is sent to /login and brought back afterwards
export const PrivateRoute = ({ isAuthenticated, component: Component, dispatch, ...rest }) => (
    <Route {...rest} render={(props) => (
        isAuthenticated ? (
            <div>
                <Header />
                <Component {...props} />
            </div>
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.user
});

export default connect(mapStateToProps)(PrivateRoute);
