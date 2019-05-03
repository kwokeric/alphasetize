import axios from 'axios';
import assign from 'lodash/assign';
import Track from '../../models/Track';

const TrackActions = {
    getSearchResults(query) {
        return (dispatch, getState) => {
            const { accessToken } = getState().user;

            let requestOptions = {
                method: 'get',
                url: 'https://api.spotify.com/v1/search?q=' + query,
                params: {
                    limit: 10,
                    type: 'artist,track'
                },
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            };

            return axios(requestOptions).then(res => {
                if (res.statusText === 'Unauthorized') {
                    window.location.href = './';
                }
                return res.data.tracks.items;
            });
        };
    },
    getTrack(id = '') {
        return (dispatch, getState) => {
            const { accessToken } = getState().user;

            let requestOptions = {
                method: 'get',
                url: 'https://api.spotify.com/v1/audio-features/' + id,
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Type': 'application/json'
                }
            };

            return axios(requestOptions).then(res => {
                if (res.statusText === 'Unauthorized') {
                    window.location.href = './';
                }
                return res.data;
            });
        };
    },
    addTrack({ basic, features }) {
        const track = new Track(assign({}, basic, features));

        return {
            type: 'ADD_TRACK',
            track
        };
    }
};

export default TrackActions;
