import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Modal from '../Modal';
import PlaylistActions from '../../redux/actions/PlaylistActions';
import './style.css';
import cx from '../../utils/cx.js';

class PlaylistModal extends Component {
    static defaultProps = {
        onHideModal: () => {},
        playlists: []
    };

    constructor(props) {
        super(props);

        this.state = {
            showError: false
        };
    }

    handleClick = (i, shouldDisable) => {
        const { dispatch, playlists } = this.props;

        if (shouldDisable) {
            this.setState({ showError: true });
            setTimeout(() => this.setState({ showError: false }), 4000);
        }

        return dispatch(PlaylistActions.getPlaylist(playlists[i].id)).catch(
            err => console.log(err)
        );
    };

    renderPlaylist = (playlist, idx) => {
        const shouldDisable = playlist.length > 50;

        return (
            <div
                className={cx('PlaylistModal-playlist noselect', {
                    'PlaylistModal-playlist-disable': shouldDisable
                })}
                key={playlist.id + idx}
                onClick={() => this.handleClick(idx, shouldDisable)}
            >
                <div>{playlist.name}</div>
                <div className="PlaylistModal-playlist-length">
                    {playlist.length}
                </div>
            </div>
        );
    };

    render() {
        const { playlists, onHideModal } = this.props;
        const { showError } = this.state;

        return (
            <Modal onHideModal={onHideModal}>
                <div className="PlaylistModal">
                    <h1 className="PlaylistModal-header">YOUR PLAYLISTS</h1>
                    <div className="PlaylistModal-container">
                        {map(playlists, (p, i) => this.renderPlaylist(p, i))}
                    </div>
                    <div className="PlaylistModal-bottom">
                        <div className="PlaylistModal-error-container">
                            <div
                                className={cx('PlaylistModal-error', {
                                    'PlaylistModal-error-hidden': !showError
                                })}
                            >
                                Please select playlist with less than 50 songs
                            </div>
                        </div>
                        <div className="PlaylistModal-btn">IMPORT</div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect()(PlaylistModal);
