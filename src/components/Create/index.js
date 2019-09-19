import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';
import Autocomplete from '../Autocomplete';
import cx from '../../utils/cx.js';
import IconDots from '../../assets/icon-dots.svg';
import List from '../List';
import ListMobile from '../ListMobile';
import Modal from '../Modal';
import ModalAllOpts from '../ModalAllOpts';
import PlaylistActions from '../../redux/actions/PlaylistActions';
import PlaylistImport from '../PlaylistImport';
import PlaylistExport from '../PlaylistExport';

class Create extends Component {
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

    handleShowAllOptions = () => {
        this.setState({ modalToShow: 'allOptions' });
    };

    handleInputFocus = () => {
        this.setState({ isInputActive: true });
    };

    handleInputBlur = () => {
        this.setState({ isInputActive: false });
    };

    renderModal = () => {
        const { playlists } = this.props;
        const { modalToShow } = this.state;

        if (!modalToShow) {
            return null;
        } else if (modalToShow === 'allOptions') {
            // mweb only
            return (
                <Modal onHideModal={this.handleHideModal} background={false}>
                    <ModalAllOpts
                        playlists={playlists}
                        onHideModal={this.handleHideModal}
                        onClickImport={this.handleImport}
                        onClickExport={this.handleExport}
                    />
                </Modal>
            );
        } else if (modalToShow === 'import') {
            return (
                <Modal onHideModal={this.handleHideModal}>
                    <PlaylistImport
                        playlists={playlists}
                        onHideModal={this.handleHideModal}
                    />
                </Modal>
            );
        } else if (modalToShow === 'export') {
            return (
                <Modal onHideModal={this.handleHideModal}>
                    <PlaylistExport onHideModal={this.handleHideModal} />
                </Modal>
            );
        }
    };

    renderMobileView = () => {
        const { isInputActive } = this.state;

        return (
            <div
                className={cx('Create-top-m', {
                    'Create-top-active-m': isInputActive
                })}
            >
                <div
                    className={cx('Create-autocomplete-m', {
                        'Create-autocomplete-active-m': isInputActive
                    })}
                >
                    <Autocomplete
                        onBlur={this.handleInputBlur}
                        onFocus={this.handleInputFocus}
                    />
                </div>

                <div
                    className={cx('Create-playlist-m', {
                        'Create-playlist-hidden-m': isInputActive
                    })}
                    onClick={this.handleShowAllOptions}
                >
                    <div className="Create-playlist-open">
                        <img height="16" src={IconDots} alt="icon-dots" />
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { list, isMobile } = this.props;

        return (
            <div className="Create">
                {this.renderModal()}
                {isMobile ? (
                    this.renderMobileView()
                ) : (
                    <div className="Create-top">
                        <div className="Create-autocomplete">
                            <Autocomplete />
                        </div>
                        <div className="Create-import-export">
                            <div
                                className="Create-import noselect"
                                onClick={this.handleImport}
                            >
                                IMPORT PLAYLIST
                            </div>
                            <div
                                className="Create-export noselect"
                                onClick={this.handleExport}
                            >
                                EXPORT PLAYLIST
                            </div>
                        </div>
                    </div>
                )}
                {isMobile ? <ListMobile list={list} /> : <List list={list} />}
                {!list.length && (
                    <div className="Create-empty-list">
                        Start searching or import a playlist!
                    </div>
                )}
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

export default connect(mapStateToProps)(Create);