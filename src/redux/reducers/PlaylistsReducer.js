const INITIAL_STATE = {
    playlists: []
};

const PlaylistsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            };

        default:
            return state;
    }
};

export default PlaylistsReducer;
