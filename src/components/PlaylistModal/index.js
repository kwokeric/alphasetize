import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Modal from '../Modal';
import './style.css';

class PlaylistModal extends Component {
    static defaultProps = {
        playlists: []
    };

    render() {
        const { playlists } = this.props;

        return (
            <Modal>
                <div className="PlaylistModal">
                    {map(playlists, p => <div>{p.name}</div>)}
                </div>
            </Modal>
        );
    }
}

export default connect()(PlaylistModal);
