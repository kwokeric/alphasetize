import React, { Component } from 'react';
import { connect } from 'react-redux';
import assign from 'lodash/assign';

import './style.css';
import cx from '../../utils/cx.js';
import IconPlaylist from '../../assets/icon-playlist.svg';
import Input from '../../core/input/index.js';
import PlaylistActions from '../../redux/actions/PlaylistActions';

const PLAYLIST_MAX_LENGTH = 100;

class PlaylistExport extends Component {
    static defaultProps = {
        playlists: []
    };

    constructor(props) {
        super(props);

        this.state = {
            title: {
                value: '',
                error: ''
            },
            description: {
                value: '',
                error: ''
            }
        };
    }

    handleTextInput = (field, e) => {
        this.setState({
            [field]: {
                value: e.target.value,
                error: ''
            }
        });
    };

    handleSubmit = (i, shouldDisable) => {
        const { dispatch, onHideModal } = this.props;
        const { title, description } = this.state;
        let _title = assign({}, title);

        if (!title.value.length) {
            _title.error = 'Title cannot be blank';
            this.setState({ title: _title });
            return;
        }

        dispatch(
            PlaylistActions.exportPlaylist({
                title: title.value,
                description: description.value
            })
        ).catch(err => console.log(err));

        onHideModal();
    };

    handleCancel = () => {
        const { onHideModal } = this.props;
        onHideModal();
    };

    render() {
        const { showError, title, description } = this.state;

        return (
            <div className="PlaylistExport">
                <h1 className="PlaylistExport-header">EXPORT PLAYLIST</h1>
                <div className="PlaylistExport-subheader">
                    <img
                        alt="IconPlaylist"
                        src={IconPlaylist}
                        className="PlaylistExport-icon-playlist"
                        height="24"
                        width="24"
                    />
                    <div>Save your new setlist to your Spotify account</div>
                </div>
                <form className="PlaylistExport-container">
                    <Input
                        className="PlaylistExport-input"
                        label="Title"
                        error={title.error}
                        maxLength={50}
                        name="title"
                        onChange={this.handleTextInput.bind(null, 'title')}
                        required
                        type="title"
                        value={title.value}
                    />
                    <Input
                        className="PlaylistExport-input"
                        label="Description"
                        error={description.error}
                        maxLength={50}
                        name="description"
                        onChange={this.handleTextInput.bind(
                            null,
                            'description'
                        )}
                        required
                        type="description"
                        value={description.value}
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
                            className="PlaylistExport-btn"
                            onClick={this.handleSubmit}
                        >
                            SUBMIT
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
