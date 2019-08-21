const AppActions = {
    setAppStoreBool(name, bool) {
        return function(dispatch) {
            return dispatch({
                type: 'SET_APP_STORE_BOOL',
                payload: {
                    name,
                    bool
                }
            });
        };
    }
};

export default AppActions;
