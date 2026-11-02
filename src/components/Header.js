import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
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
                </nav>
            </div>
        </div>
    </header>
);

export default Header;
