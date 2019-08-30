import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import IconX from '../../assets/icon-x.svg';

class ModalAllOpts extends Component {
    handleClickImport = () => {
        const { onHideModal, onClickImport } = this.props;
        onClickImport();
        onHideModal();
    };

    handleClickExport = () => {
        const { onClickExport } = this.props;
        onClickExport();
    };

    handleClickHome = () => {
        const { onClickExport } = this.props;
        onClickExport();
    };

    render() {
        const { onHideModal } = this.props;
        return (
            <div className="ModalAllOpts">
                <div className="ModalAllOpts-x" onClick={onHideModal}>
                    <img height="16" src={IconX} alt="icon-dots" />
                </div>
                <div className="ModalAllOpts-option">
                    <div
                        className="ModalAllOpts-btn"
                        onClick={this.handleClickImport}
                    >
                        Import playlist
                    </div>
                </div>
                <div className="ModalAllOpts-option">
                    <div
                        className="ModalAllOpts-btn"
                        onClick={this.handleClickExport}
                    >
                        Export playlist
                    </div>
                </div>
                <div className="ModalAllOpts-option">
                    <Link to={'/'}>
                        <div
                            className="ModalAllOpts-btn"
                            onClick={this.handleClickHome}
                        >
                            Home
                        </div>
                    </Link>
                </div>
                <div className="ModalAllOpts-option">
                    <div
                        className="ModalAllOpts-btn"
                        onClick={this.handleCancel}
                    >
                        Share
                    </div>
                </div>
                <div className="ModalAllOpts-option">
                    <div
                        className="ModalAllOpts-btn"
                        onClick={this.handleCancel}
                    >
                        Auto sort
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(ModalAllOpts);
