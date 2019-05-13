import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpotifyActions from '../../redux/actions/SpotifyActions';
import PlaylistActions from '../../redux/actions/PlaylistActions';
import Autocomplete from '../Autocomplete';
import PlaylistModal from '../PlaylistModal';
import List from '../List';
import './style.css';

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

        return dispatch(SpotifyActions.getPlaylists())
            .then(playlists => {
                return dispatch(PlaylistActions.setPlaylists(playlists.items));
            })
            .then(() => this.setState({ showPlaylistModal: true }))
            .catch(err => console.log(err));
    };

    render() {
        // add results here
        const { list, playlists } = this.props;
        const { showPlaylistModal } = this.state;
        console.log(showPlaylistModal);

        return (
            <div className="Search">
                {showPlaylistModal && <PlaylistModal playlists={playlists} />}
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
