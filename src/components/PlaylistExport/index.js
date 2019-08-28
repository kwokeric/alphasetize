import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../core/input/index.js';
import PlaylistActions from '../../redux/actions/PlaylistActions';
import './style.css';
import cx from '../../utils/cx.js';

const PLAYLIST_MAX_LENGTH = 100;

class PlaylistExport extends Component {
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

        dispatch(PlaylistActions.getAndSetPlaylist(currPlaylist.id)).catch(
            err => console.log(err)
        );

        onHideModal();
    };

    handleCancel = () => {
        const { onHideModal } = this.props;
        onHideModal();
    };

    render() {
        const { showError, activeIndex } = this.state;

        return (
            <div className="PlaylistExport">
                <h1 className="PlaylistExport-header">EXPORT PLAYLIST</h1>
                <form className="PlaylistExport-container">
                    <Input
                        autoFocus
                        className="login-input login-input-pw"
                        label="Password"
                        help={'this is help'}
                        maxLength={50}
                        name="title"
                        onChange={this.handleTextInput}
                        required
                        type="title"
                        value={'halo'}
                    />
                </form>
                <div className="PlaylistExport-bottom">
                    <div className="PlaylistExport-error-container">
                        <div
                            className={cx('PlaylistExport-error', {
                                'PlaylistExport-error-hidden': !showError
                            })}
                        >
                            Please select a playlist with less than{' '}
                            {PLAYLIST_MAX_LENGTH} songs
                        </div>
                    </div>
                    <div className="PlaylistExport-btn-container">
                        <div
                            className={cx('PlaylistExport-btn', {
                                'PlaylistExport-btn-active': activeIndex !== -1
                            })}
                            onClick={this.handleImport}
                        >
                            IMPORT
                        </div>
                        <div
                            className="PlaylistExport-btn-cancel"
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

export default connect()(PlaylistExport);
