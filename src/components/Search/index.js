import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpotifyActions from '../../redux/actions/SpotifyActions';
import PlaylistActions from '../../redux/actions/PlaylistActions';
import './style.css';
import Autocomplete from '../Autocomplete';
import List from '../List';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPlaylistModal: false
        };
    }

    componentDidMount() {
        // create Input ref and set to active
    }

    handleClick = () => {
        const { dispatch } = this.props;

        return dispatch(SpotifyActions.getPlaylists()).then(playlists => {
            return dispatch(PlaylistActions.setPlaylists(playlists.items));
        });
    };

    render() {
        // add results here
        const { list, playlists } = this.props;
        console.log(playlists);

        return (
            <div className="Search">
                <div className="Search-autocomplete">
                    <Autocomplete />
                </div>
                <div className="Search-import" onClick={this.handleClick}>
                    IMPORT
                </div>
                <List list={list} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        playlists: state.playlists.playlists,
        list: state.tracks.list
    };
};

export default connect(mapStateToProps)(Search);
