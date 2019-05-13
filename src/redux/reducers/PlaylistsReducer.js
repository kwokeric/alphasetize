const PlaylistsReducer = (state = {}, action) => {
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
