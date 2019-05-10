import assign from 'lodash/assign';

const TracksReducer = (state = {}, action) => {
    let newList;
    switch (action.type) {
        case 'ADD_TRACK':
            newList = assign([], state.list);
            newList.push(action.track);

            return {
                ...state,
                list: newList
            };
        case 'REMOVE_TRACK':
            newList = assign([], state.list);
            newList.splice(action.index, 1);

            return {
                ...state,
                list: newList
            };

        default:
            return state;
    }
};

export default TracksReducer;
