const AppReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_APP_STORE_BOOL':
            return {
                ...state,
                [action.payload.name]: action.payload.bool
            };

        default:
            return state;
    }
};

export default AppReducer;
