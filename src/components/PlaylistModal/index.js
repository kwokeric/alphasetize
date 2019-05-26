import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Modal from '../Modal';
import PlaylistActions from '../../redux/actions/PlaylistActions';
import './style.css';
import cx from '../../utils/cx.js';

const PLAYLIST_MAX_LENGTH = 100;

class PlaylistModal extends Component {
    static defaultProps = {
        onHideModal: () => {},
        playlists: []
    };

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: -1,
            showError: false
        };
    }

    handleClick = i => {
        this.setState({ activeIndex: i });
    };

    handleImport = (i, shouldDisable) => {
        const { dispatch, playlists, onHideModal } = this.props;
        const { activeIndex } = this.state;
        const currPlaylist = playlists[activeIndex];

        if (activeIndex < 0) {
            return;
        }

        if (currPlaylist.length > 100) {
            this.setState({ showError: true });
            setTimeout(() => this.setState({ showError: false }), 4000);
            return;
        }

        dispatch(PlaylistActions.getPlaylist(currPlaylist.id)).catch(err =>
            console.log(err)
        );

        onHideModal();
    };

    handleCancel = () => {
        const { onHideModal } = this.props;
        onHideModal();
    };

    renderPlaylist = (playlist, idx) => {
        const { activeIndex } = this.state;
        const shouldDisable = playlist.length > PLAYLIST_MAX_LENGTH;

        return (
            <div
                className={cx('PlaylistModal-playlist noselect', {
                    'PlaylistModal-playlist-disable': shouldDisable,
                    'PlaylistModal-playlist-active': activeIndex === idx
                })}
                key={playlist.id + idx}
                onClick={() => this.handleClick(idx, shouldDisable)}
            >
                <div>{playlist.name}</div>
                <div className="PlaylistModal-playlist-length">
                    {playlist.length} songs
                </div>
            </div>
        );
    };

    render() {
        const { playlists, onHideModal } = this.props;
        const { showError, activeIndex } = this.state;

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
                                Please select a playlist with less than{' '}
                                {PLAYLIST_MAX_LENGTH} songs
                            </div>
                        </div>
                        <div className="PlaylistModal-btn-container">
                            <div
                                className={cx('PlaylistModal-btn', {
                                    'PlaylistModal-btn-active':
                                        activeIndex !== -1
                                })}
                                onClick={this.handleImport}
                            >
                                IMPORT
                            </div>
                            <div
                                className="PlaylistModal-btn-cancel"
                                onClick={this.handleCancel}
                            >
                                CANCEL
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect()(PlaylistModal);
