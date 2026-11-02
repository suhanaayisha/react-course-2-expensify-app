import * as api from '../api/auth';
import { setExpenses, startSetExpenses } from './expenses';

export const login = (user) => ({
    type: 'LOGIN',
    user
});

export const logout = () => ({
    type: 'LOGOUT'
});

// Load the user's expenses before marking them signed in, so the dashboard
// never flashes an empty list
const finishLogin = (user) => async (dispatch) => {
    await dispatch(startSetExpenses());
    dispatch(login(user));
    return user;
};

export const startSignup = (username, password) => async (dispatch) => {
    const { user } = await api.signup(username, password);
    return dispatch(finishLogin(user));
};

export const startLogin = (username, password) => async (dispatch) => {
    const { user } = await api.login(username, password);
    return dispatch(finishLogin(user));
};

// Restores the session when the app loads; resolves to the user or null
export const startRestoreSession = () => async (dispatch) => {
    const user = await api.fetchCurrentUser();
    if (user) {
        await dispatch(finishLogin(user));
    }
    return user;
};

export const startLogout = () => async (dispatch) => {
    await api.logout();
    dispatch(logout());
    dispatch(setExpenses([]));
};
