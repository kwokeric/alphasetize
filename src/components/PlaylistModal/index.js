import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Modal from '../Modal';
import './style.css';

class PlaylistModal extends Component {
    static defaultProps = {
        onHideModal: () => {},
        playlists: []
    };

    renderPlaylist = (playlist, idx) => {
        return (
            <div className="PlaylistModal-playlist" key={playlist.id + idx}>
                {playlist.name}
            </div>
        );
    };

    render() {
        const { playlists, onHideModal } = this.props;

        return (
            <Modal onHideModal={onHideModal}>
                <div className="PlaylistModal">
                    <h1 className="PlaylistModal-header">YOUR PLAYLISTS</h1>
                    <div className="PlaylistModal-container">
                        {map(playlists, (p, i) => this.renderPlaylist(p, i))}
                    </div>
                    <div className="PlaylistModal-bottom">
                        <div className="PlaylistModal-btn">IMPORT</div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect()(PlaylistModal);
