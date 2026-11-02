import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// Login/sign-up pages; once signed in, go to the page they originally wanted (or the dashboard)
export const PublicRoute = ({ isAuthenticated, component: Component, dispatch, ...rest }) => (
    <Route {...rest} render={(props) => {
        if (isAuthenticated) {
            const { from } = props.location.state || {};
            return <Redirect to={from || '/'} />;
        }
        return <Component {...props} />;
    }} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.user
});

export default connect(mapStateToProps)(PublicRoute);
