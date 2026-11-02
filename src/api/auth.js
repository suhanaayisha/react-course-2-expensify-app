import request from './request';

// A 401 from these means "wrong password" or "not signed in", not an expired session
const options = { handleUnauthorized: false };

export const signup = (username, password) => request('POST', '/auth/signup', { username, password }, options);
export const login = (username, password) => request('POST', '/auth/login', { username, password }, options);
export const logout = () => request('POST', '/auth/logout', undefined, options);

// Resolves to the signed-in user, or null if nobody is signed in
export const fetchCurrentUser = async () => {
    try {
        const { user } = await request('GET', '/auth/me', undefined, options);
        return user;
    } catch (e) {
        if (e.status === 401) {
            return null;
        }
        throw e;
    }
};
