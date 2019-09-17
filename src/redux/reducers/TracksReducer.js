import assign from 'lodash/assign';

const INITIAL_STATE = {
    list: []
};

const TracksReducer = (state = INITIAL_STATE, action) => {
    let newList = assign([], state.list);

    switch (action.type) {
        case 'ADD_TRACK':
            newList.push(action.track);

            return {
                ...state,
                list: newList
            };
        case 'REMOVE_TRACK':
            newList.splice(action.index, 1);

            return {
                ...state,
                list: newList
            };
        case 'MOVE_TRACK':
            const track = newList[action.startIndex];
            newList.splice(action.startIndex, 1);
            newList.splice(action.endIndex, 0, track);

            return {
                ...state,
                list: newList
            };
        case 'ADD_TRACKS':
            newList = action.tracks;

            return {
                ...state,
                list: newList
            };

        default:
            return state;
    }
};

export default TracksReducer;
