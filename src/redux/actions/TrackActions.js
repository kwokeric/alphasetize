import assign from 'lodash/assign';
import Track from '../../models/Track';

const TrackActions = {
    addTrack({ basic, features }) {
        const track = new Track(assign({}, basic, features));

        return {
            type: 'ADD_TRACK',
            track
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
