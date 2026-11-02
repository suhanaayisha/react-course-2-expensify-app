// Auth Reducer
const authReducerDefaultState = {
    user: null
};

export default (state = authReducerDefaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.user };

        case 'LOGOUT':
            return { user: null };

        default:
            return state;
    }
};
