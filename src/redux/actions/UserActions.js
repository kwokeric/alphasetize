const UserActions = {
    setToken: accessToken => {
        // type shouldn't be string
        return {
            type: 'SET_TOKEN',
            accessToken
        };
    }
};

export default UserActions;
