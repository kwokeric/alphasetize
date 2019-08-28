import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';
import Autocomplete from '../Autocomplete';
import cx from '../../utils/cx.js';
import List from '../List';
import ListMobile from '../ListMobile';
import Modal from '../Modal';
import PlaylistActions from '../../redux/actions/PlaylistActions';
import PlaylistImport from '../PlaylistImport';
import PlaylistExport from '../PlaylistExport';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalToShow: null,
            fullCta: null,
            isInputActive: false
        };
    }

    componentDidMount() {
        // create Input ref and set to active
    }

    handleImport = () => {
        const { dispatch } = this.props;

        return dispatch(PlaylistActions.getPlaylists())
            .then(playlists => {
                return dispatch(PlaylistActions.setPlaylists(playlists.items));
            })
            .then(() => this.setState({ modalToShow: 'import' }))
            .catch(err => console.log(err));
    };

    handleExport = () => {
        this.setState({ modalToShow: 'export' });
    };

    handleHideModal = () => {
        this.setState({ modalToShow: null });
    };

    handleImportMobile = () => {
        this.setState({ fullCta: 'playlist' });
        this.handleImport();
    };

    handleInputFocus = () => {
        this.setState({ isInputActive: true });
    };

    handleInputBlur = () => {
        this.setState({ isInputActive: false });
    };

    renderMobileView = () => {
        const { isInputActive } = this.state;

        return (
            <div
                className={cx('Search-top-m', {
                    'Search-top-active-m': isInputActive
                })}
            >
                <div
                    className={cx('Search-autocomplete-m', {
                        'Search-autocomplete-active-m': isInputActive
                    })}
                >
                    <Autocomplete
                        onBlur={this.handleInputBlur}
                        onFocus={this.handleInputFocus}
                    />
                </div>

                <div
                    className={cx('Search-playlist-m', {
                        'Search-playlist-hidden-m': isInputActive
                    })}
                    onClick={this.handleImportMobile}
                >
                    <div className="Search-playlist-open">+</div>
                </div>
            </div>
        );
    };

    render() {
        const { list, playlists, isMobile } = this.props;
        const { modalToShow } = this.state;

        return (
            <div className="Search">
                {modalToShow === 'import' && (
                    <Modal onHideModal={this.handleHideModal}>
                        <PlaylistImport
                            playlists={playlists}
                            onHideModal={this.handleHideModal}
                        />
                    </Modal>
                )}
                {modalToShow === 'export' && (
                    <Modal onHideModal={this.handleHideModal}>
                        <PlaylistExport onHideModal={this.handleHideModal} />
                    </Modal>
                )}
                {isMobile ? (
                    this.renderMobileView()
                ) : (
                    <div className="Search-top">
                        <div className="Search-autocomplete">
                            <Autocomplete />
                        </div>
                        <div className="Search-import-export">
                            <div
                                className="Search-import noselect"
                                onClick={this.handleImport}
                            >
                                IMPORT PLAYLIST
                            </div>
                            <div
                                className="Search-export noselect"
                                onClick={this.handleExport}
                            >
                                EXPORT PLAYLIST
                            </div>
                        </div>
                    </div>
                )}
                {isMobile ? <ListMobile list={list} /> : <List list={list} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isMobile: state.app.isMobile,
        playlists: state.playlists.playlists,
        list: state.tracks.list
    };
};

export default connect(mapStateToProps)(Search);
