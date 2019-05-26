import assign from 'lodash/assign';
import map from 'lodash/map';

import Track from '../../models/Track';

const TrackActions = {
    addTrack({ basic, features }) {
        const track = new Track(assign({}, basic, features));

        return {
            type: 'ADD_TRACK',
            track
        };
    },
    addTracks(tracksData) {
        const tracks = map(tracksData, track => new Track(track));

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
