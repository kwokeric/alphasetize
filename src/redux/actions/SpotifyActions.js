const SpotifyActions = {
    setToken: token => {
        return {
            type: 'SET_TOKEN',
            token
        };
    }
};

export default SpotifyActions;
