import axios from 'axios';

const SpotifyActions = {
    getTracks(ids = '') {
        return (dispatch, getState) => {
            const { accessToken } = getState().user;

            let requestOptions = {
                method: 'get',
                url: 'https://api.spotify.com/v1/audio-features/?ids=' + ids,
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
    getPlaylists(id = '') {
        return (dispatch, getState) => {
            const { accessToken } = getState().user;

            let requestOptions = {
                method: 'get',
                url: 'https://api.spotify.com/v1/me/playlists?limit=50',
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
    getPlaylist(playlistId) {
        return (dispatch, getState) => {
            const { accessToken } = getState().user;

            let requestOptions = {
                method: 'get',
                url: 'https://api.spotify.com/v1/playlists/' + playlistId,
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
    }
};

export default SpotifyActions;
