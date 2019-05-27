import requester from './requester';

const api = {
    spotify: {
        searchBasic(q) {
            return requester({
                path: 'https://api.spotify.com/v1/search',
                queryParams: {
                    q,
                    limit: 10,
                    type: 'artist,track'
                }
            });
        },
        searchFeatures(ids) {
            return requester({
                path: 'https://api.spotify.com/v1/audio-features',
                queryParams: {
                    ids
                }
            });
        }
    }
};
export default api;
