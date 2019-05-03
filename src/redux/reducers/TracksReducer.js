import assign from 'lodash/assign';

const TracksReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TRACK':
            let newList = assign({}, state.list);
            newList[action.track.id] = action.track;

            return {
                ...state,
                list: newList
            };

        default:
            return state;
    }
};

export default TracksReducer;
