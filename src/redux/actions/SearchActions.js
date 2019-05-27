import api from '../../utils/api';
import TrackActions from './TrackActions';

const SearchActions = {
    getTrackBasicByQuery(query) {
        return (dispatch, getState) => {
            return dispatch(api.spotify.searchBasic(query)).then(res => {
                const items = res.tracks && res.tracks.items;
                if (!items) {
                    return false;
                }
                return items;
            });
        };
    },
    getTrackWithBasicAndFeatures(basicData = {}) {
        return (dispatch, getState) => {
            return dispatch(
                SearchActions.getTrackFeaturesByIds(basicData.id)
            ).then(featuresData => {
                return dispatch(
                    TrackActions.addTrack({
                        basic: basicData,
                        features: featuresData
                    })
                );
            });
        };
    },
    getTrackFeaturesByIds(ids) {
        return (dispatch, getState) => {
            return dispatch(api.spotify.searchFeatures(ids));
        };
    }
};

export default SearchActions;
