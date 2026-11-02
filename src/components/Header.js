import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Header = ({ username, startLogout, history }) => {
    const onLogout = async () => {
        try {
            await startLogout();
        } finally {
            // Plain /login, so the next person to sign in isn't sent back to this user's page
            history.replace('/login');
        }
    };

    return (
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    <Link className="header__title" to="/">
                        <h1>Expensify</h1>
                    </Link>
                    <nav className="header__nav">
                        <NavLink to='/' className="header__link" activeClassName='is-active' exact={true}>Dashboard</NavLink>
                        <NavLink to='/create' className="header__link" activeClassName='is-active'>Add Expense</NavLink>
                        <NavLink to='/help' className="header__link" activeClassName='is-active'>Help</NavLink>
                        <span className="header__user" title="Signed in as">{username}</span>
                        <button className="header__logout" onClick={onLogout}>Log out</button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

const mapStateToProps = (state) => ({
    username: state.auth.user ? state.auth.user.username : ''
});

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
