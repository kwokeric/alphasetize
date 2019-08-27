import assign from 'lodash/assign';
import map from 'lodash/map';

import api from '../../utils/api';
import Playlist from '../../models/Playlist';
import SearchActions from './SearchActions';
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
    getPlaylists() {
        return (dispatch, getState) => {
            return dispatch(api.spotify.getPlaylists()).then(res => {
                if (res.statusText === 'Unauthorized') {
                    window.location.href = './';
                }
                return res;
            });
        };
    },
    getPlaylist(playlistId) {
        return (dispatch, getState) => {
            return dispatch(api.spotify.getPlaylist(playlistId)).then(res => {
                if (res.statusText === 'Unauthorized') {
                    window.location.href = './';
                }
                return res;
            });
        };
    },
    getAndSetPlaylist(playlistId) {
        return function(dispatch, getState) {
            let tracksBasic;
            return dispatch(PlaylistActions.getPlaylist(playlistId))
                .then(res => {
                    tracksBasic = res.tracks.items;

                    const _trackIds = map(tracksBasic, t => {
                        return (t.track && t.track.id) || '';
                    });

                    return dispatch(
                        SearchActions.getTrackFeaturesByIds(_trackIds.join(','))
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
    },
    exportPlaylist(playlistId) {
        return (dispatch, getState) => {
            const user = getState().user;
            return dispatch(api.spotify.createPlaylist(user.id))
                .then(res => {
                    if (res.statusText === 'Unauthorized') {
                        window.location.href = './';
                    }
                    return res;
                })
                .then(res => console.log(res));
        };
    },
    createEmptyPlaylist(playlistId) {
        return (dispatch, getState) => {
            return dispatch(api.spotify.getPlaylist(playlistId))
                .then(res => {
                    if (res.statusText === 'Unauthorized') {
                        window.location.href = './';
                    }
                    return res;
                })
                .then(res => console.log(res));
        };
    }
};

export default PlaylistActions;
