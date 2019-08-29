import requester from './requester';

const api = {
    spotify: {
        getUser() {
            return requester({
                path: 'https://api.spotify.com/v1/me'
            });
        },
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
        },
        getPlaylists() {
            return requester({
                path: 'https://api.spotify.com/v1/me/playlists?limit=50'
            });
        },
        getPlaylist(playlistId) {
            return requester({
                path: 'https://api.spotify.com/v1/playlists/' + playlistId
            });
        },
        createPlaylist({ userId, title, description }) {
            return requester({
                path: `https://api.spotify.com/v1/users/${userId}/playlists`,
                method: 'post',
                body: JSON.stringify({
                    name: title,
                    description: description
                })
            });
        },
        addTracksToPlaylist({ playlistId, tracks }) {
            return requester({
                path: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                method: 'post',
                body: JSON.stringify({
                    uris: tracks
                })
            });
        }
    }
};
export default api;
