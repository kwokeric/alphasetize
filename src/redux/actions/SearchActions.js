import assign from 'lodash/assign';
import api from '../../utils/api';
import TrackActions from './TrackActions';
import Track from '../../models/Track';

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
                const features = featuresData.audio_features[0];
                const track = new Track(assign({}, basicData, features));

                return dispatch(TrackActions.addTrack(track));
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
