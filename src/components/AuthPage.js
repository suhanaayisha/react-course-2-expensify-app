import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin, startSignup } from '../actions/auth';

const MIN_PASSWORD_LENGTH = 8;

const copy = {
    login: {
        title: 'Log in',
        button: 'Log in',
        busy: 'Logging in…',
        switchText: "Don't have an account?",
        switchLink: 'Sign up',
        switchTo: '/signup'
    },
    signup: {
        title: 'Create your account',
        button: 'Sign up',
        busy: 'Creating account…',
        switchText: 'Already have an account?',
        switchLink: 'Log in',
        switchTo: '/login'
    }
};

export const AuthPage = ({ mode, startLogin, startSignup, location }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const isSignup = mode === 'signup';
    const text = copy[mode];

    const onSubmit = async (e) => {
        e.preventDefault();
        if (submitting) {
            return;
        }
        if (!username.trim() || !password) {
            return setError('Please enter your user ID and password');
        }
        if (isSignup && password.length < MIN_PASSWORD_LENGTH) {
            return setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
        }
        if (isSignup && password !== confirmPassword) {
            return setError("Passwords don't match");
        }

        setError('');
        setSubmitting(true);
        try {
            // On success the store updates and PublicRoute redirects away from this page
            await (isSignup ? startSignup(username, password) : startLogin(username, password));
        } catch (err) {
            setError(err.message);
            setSubmitting(false);
        }
    };

    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__brand">Expensify</h1>
                <p className="box-layout__tagline">Keep your spending in check.</p>
                <h2 className="box-layout__title">{text.title}</h2>
                <form className="auth-form" onSubmit={onSubmit} noValidate>
                    {error && <p className="form__error">{error}</p>}
                    <label className="form__field">
                        <span className="form__label">User ID</span>
                        <input
                            type="text"
                            className="text-input"
                            name="username"
                            autoComplete="username"
                            autoCapitalize="none"
                            spellCheck={false}
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {isSignup && <span className="form__hint">3–30 characters: letters, numbers, dots, dashes or underscores</span>}
                    </label>
                    <label className="form__field">
                        <span className="form__label">Password</span>
                        <input
                            type="password"
                            className="text-input"
                            name="password"
                            autoComplete={isSignup ? 'new-password' : 'current-password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isSignup && <span className="form__hint">At least {MIN_PASSWORD_LENGTH} characters</span>}
                    </label>
                    {isSignup && (
                        <label className="form__field">
                            <span className="form__label">Confirm password</span>
                            <input
                                type="password"
                                className="text-input"
                                name="confirmPassword"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                    )}
                    <button className="button button--full" disabled={submitting}>
                        {submitting ? text.busy : text.button}
                    </button>
                </form>
                <p className="box-layout__switch">
                    {text.switchText}{' '}
                    <Link to={{ pathname: text.switchTo, state: location && location.state }}>{text.switchLink}</Link>
                </p>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    startLogin: (username, password) => dispatch(startLogin(username, password)),
    startSignup: (username, password) => dispatch(startSignup(username, password))
});

const ConnectedAuthPage = connect(undefined, mapDispatchToProps)(AuthPage);

export const LoginPage = (props) => <ConnectedAuthPage mode="login" {...props} />;
export const SignupPage = (props) => <ConnectedAuthPage mode="signup" {...props} />;
