import authReducer from '../../reducers/auth';

const user = { id: 'u1', username: 'suhana' };

test('should start signed out', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual({ user: null });
});

test('should set user on login', () => {
    expect(authReducer(undefined, { type: 'LOGIN', user })).toEqual({ user });
});

test('should clear user on logout', () => {
    expect(authReducer({ user }, { type: 'LOGOUT' })).toEqual({ user: null });
});
