// tracks must be created before calling addTrack

const TrackActions = {
    addTrack(track) {
        return {
            type: 'ADD_TRACK',
            track
        };
    },
    addTracks(tracks) {
        return {
            type: 'ADD_TRACKS',
            tracks
        };
    },
    removeTrack(index) {
        return {
            type: 'REMOVE_TRACK',
            index
        };
    },
    moveTrack({ startIndex, endIndex }) {
        return {
            type: 'MOVE_TRACK',
            startIndex,
            endIndex
        };
    }
};

export default TrackActions;
