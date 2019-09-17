import assign from 'lodash/assign';

const INITIAL_STATE = {
    accessToken: ''
};

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                accessToken: action.accessToken
            };
        case 'SET_USER':
            return assign(state, action.user);

        default:
            return state;
    }
};

export default UserReducer;
