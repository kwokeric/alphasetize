import map from 'lodash/map';
import Playlist from '../../models/Playlist';

const PlaylistActions = {
    setPlaylists(playlists) {
        const _playlists = map(playlists, p => {
            return new Playlist(p);
        });

        return {
            type: 'ADD_PLAYLISTS',
            playlists: _playlists
        };
    }
};

export default PlaylistActions;
