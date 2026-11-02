import { login, logout, startLogin, startSignup, startLogout, startRestoreSession } from '../../actions/auth';
import { setExpenses } from '../../actions/expenses';
import * as authApi from '../../api/auth';
import * as expensesApi from '../../api/expenses';
import expenses from '../fixtures/expenses';

jest.mock('../../api/auth');
jest.mock('../../api/expenses');

const user = { id: 'u1', username: 'suhana' };

// Runs thunks the way redux-thunk does, and records plain actions
const createDispatch = () => {
    const actions = [];
    const dispatch = (action) => (typeof action === 'function' ? action(dispatch) : actions.push(action));
    return { dispatch, actions };
};

beforeEach(() => {
    jest.resetAllMocks();
    expensesApi.fetchExpenses.mockImplementation(() => Promise.resolve(expenses));
});

test('should set up login action object', () => {
    expect(login(user)).toEqual({ type: 'LOGIN', user });
});

test('should set up logout action object', () => {
    expect(logout()).toEqual({ type: 'LOGOUT' });
});

test('should log in, then load expenses before marking the user signed in', async () => {
    authApi.login.mockImplementation(() => Promise.resolve({ user }));
    const { dispatch, actions } = createDispatch();
    await startLogin('suhana', 'secret123')(dispatch);
    expect(authApi.login).toHaveBeenLastCalledWith('suhana', 'secret123');
    expect(actions).toEqual([setExpenses(expenses), login(user)]);
});

test('should sign up, then load expenses and sign in', async () => {
    authApi.signup.mockImplementation(() => Promise.resolve({ user }));
    const { dispatch, actions } = createDispatch();
    await startSignup('suhana', 'secret123')(dispatch);
    expect(authApi.signup).toHaveBeenLastCalledWith('suhana', 'secret123');
    expect(actions).toEqual([setExpenses(expenses), login(user)]);
});

test('should not sign in if the password is wrong', async () => {
    authApi.login.mockImplementation(() => Promise.reject(new Error('Incorrect user ID or password')));
    const { dispatch, actions } = createDispatch();
    let error;
    try {
        await startLogin('suhana', 'nope')(dispatch);
    } catch (e) {
        error = e;
    }
    expect(error.message).toBe('Incorrect user ID or password');
    expect(actions).toEqual([]);
});

test('should restore an existing session', async () => {
    authApi.fetchCurrentUser.mockImplementation(() => Promise.resolve(user));
    const { dispatch, actions } = createDispatch();
    const result = await startRestoreSession()(dispatch);
    expect(result).toEqual(user);
    expect(actions).toEqual([setExpenses(expenses), login(user)]);
});

test('should stay signed out when there is no session', async () => {
    authApi.fetchCurrentUser.mockImplementation(() => Promise.resolve(null));
    const { dispatch, actions } = createDispatch();
    const result = await startRestoreSession()(dispatch);
    expect(result).toBe(null);
    expect(actions).toEqual([]);
    expect(expensesApi.fetchExpenses).not.toHaveBeenCalled();
});

test('should log out and clear expenses', async () => {
    authApi.logout.mockImplementation(() => Promise.resolve(null));
    const { dispatch, actions } = createDispatch();
    await startLogout()(dispatch);
    expect(authApi.logout).toHaveBeenCalled();
    expect(actions).toEqual([logout(), setExpenses([])]);
});
