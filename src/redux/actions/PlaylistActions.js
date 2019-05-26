import assign from 'lodash/assign';
import map from 'lodash/map';

import Playlist from '../../models/Playlist';
import SpotifyActions from './SpotifyActions';
import TrackActions from './TrackActions';
import Track from '../../models/Track';

const PlaylistActions = {
    setPlaylists(playlists) {
        const _playlists = map(playlists, p => {
            return new Playlist(p);
        });

        return {
            type: 'ADD_PLAYLISTS',
            playlists: _playlists
        };
    },
    getPlaylist(playlistId) {
        return function(dispatch, getState) {
            let tracksBasic;
            return dispatch(SpotifyActions.getPlaylist(playlistId))
                .then(res => {
                    tracksBasic = res.tracks.items;

                    const _trackIds = map(tracksBasic, t => {
                        return t.track.id;
                    });

                    return dispatch(
                        SpotifyActions.getTracks(_trackIds.join(','))
                    );
                })
                .then(res => {
                    const tracksFeatures = res.audio_features;
                    if (!tracksFeatures) {
                        return false;
                    }

                    let tracks = [];
                    for (let i = 0; i < tracksFeatures.length; i++) {
                        tracks.push(
                            new Track(
                                assign(
                                    {},
                                    tracksBasic[i].track,
                                    tracksFeatures[i]
                                )
                            )
                        );
                    }

                    return tracks;
                })
                .then(tracks => dispatch(TrackActions.addTracks(tracks)));
        };
    }
};

export default PlaylistActions;
