import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import PlaylistActions from '../../redux/actions/PlaylistActions';
import './style.css';
import cx from '../../utils/cx.js';

const PLAYLIST_MAX_LENGTH = 100;

class PlaylistImport extends Component {
    static defaultProps = {
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
        if (this.state.activeIndex === i) {
            this.handleImport();
        } else {
            this.setState({ activeIndex: i });
        }
    };

    handleImport = () => {
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

        dispatch(
            PlaylistActions.getAndSetPlaylist(currPlaylist.id)
        ).catch(err => console.log(err));

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
                className={cx('PlaylistImport-playlist noselect', {
                    'PlaylistImport-playlist-disable': shouldDisable,
                    'PlaylistImport-playlist-active': activeIndex === idx
                })}
                key={playlist.id + idx}
                onClick={() => this.handleClick(idx, shouldDisable)}
            >
                <div>{playlist.name}</div>
                <div className="PlaylistImport-playlist-length">
                    {playlist.length} songs
                </div>
            </div>
        );
    };

    render() {
        const { playlists } = this.props;
        const { showError, activeIndex } = this.state;

        return (
            <div className="PlaylistImport">
                <h1 className="PlaylistImport-header">YOUR PLAYLISTS</h1>
                <div className="PlaylistImport-container">
                    {map(playlists, (p, i) => this.renderPlaylist(p, i))}
                </div>
                <div className="PlaylistImport-bottom">
                    <div className="PlaylistImport-error-container">
                        <div
                            className={cx('PlaylistImport-error', {
                                'PlaylistImport-error-hidden': !showError
                            })}
                        >
                            Please select a playlist with less than{' '}
                            {PLAYLIST_MAX_LENGTH} songs
                        </div>
                    </div>
                    <div className="PlaylistImport-btn-container">
                        <div
                            className={cx('PlaylistImport-btn', {
                                'PlaylistImport-btn-active': activeIndex !== -1
                            })}
                            onClick={this.handleImport}
                        >
                            IMPORT
                        </div>
                        <div
                            className="PlaylistImport-btn-cancel"
                            onClick={this.handleCancel}
                        >
                            CANCEL
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(PlaylistImport);
