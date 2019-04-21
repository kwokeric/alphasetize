const SpotifyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            console.log('action:::', action);
            return {
                ...state,
                token: action.token
            };

        default:
            return state;
    }
};

export default SpotifyReducer;
