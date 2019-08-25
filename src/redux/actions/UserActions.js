import api from '../../utils/api';

const UserActions = {
    setToken: accessToken => {
        // TODO: type shouldn't be string
        return {
            type: 'SET_TOKEN',
            accessToken
        };
    },
    getUser: () => {
        return (dispatch, getState) => {
            console.log(getState());
            return dispatch(api.spotify.getUser())
                .then(res => {
                    if (res.statusText === 'Unauthorized') {
                        window.location.href = './';
                    }
                    return res;
                })
                .then(user => dispatch(UserActions.setUser(user)));
        };
    },
    setUser: user => {
        return {
            type: 'SET_USER',
            user
        };
    }
};

export default UserActions;
