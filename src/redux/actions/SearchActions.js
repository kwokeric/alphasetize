import api from '../../utils/api';

const SearchActions = {
    getByArtistAndTrack(query) {
        return (dispatch, getState) => {
            return dispatch(api.spotify.search(query)).then(res => {
                const items = res.tracks && res.tracks.items;
                if (!items) {
                    return false;
                }
                return items;
            });
        };
    }
};

export default SearchActions;
