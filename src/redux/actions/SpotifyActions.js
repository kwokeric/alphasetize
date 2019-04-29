import axios from 'axios';

const SpotifyActions = {
    setToken: accessToken => {
        return {
            type: 'SET_TOKEN',
            accessToken
        };
    },
    getSearchResults(query) {
        return (dispatch, getState) => {
            const { accessToken } = getState().spotify;

            let requestOptions = {
                method: 'get',
                url: 'https://api.spotify.com/v1/search?q=' + query,
                params: {
                    type: 'track'
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
    }
};

export default SpotifyActions;
