import requester from './requester';

const api = {
    spotify: {
        search(q) {
            return requester({
                path: 'https://api.spotify.com/v1/search',
                queryParams: {
                    q,
                    limit: 10,
                    type: 'artist,track'
                }
            });
        }
    }
};
export default api;
