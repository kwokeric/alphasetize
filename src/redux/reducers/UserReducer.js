const SpotifyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                accessToken: action.accessToken
            };
        case 'ADD_TRACK':
            return {
                ...state,
                trackInfo: action.trackInfo
            };

        default:
            return state;
    }
};

export default SpotifyReducer;
