import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.css';
import IconX from '../../assets/icon-x.svg';

class ModalAllOpts extends Component {
    render() {
        const {
            onHideModal,
            onClickImport,
            onClickExport,
            onClickHelp
        } = this.props;
        return (
            <div className="ModalAllOpts">
                <div className="ModalAllOpts-x" onClick={onHideModal}>
                    <img height="16" src={IconX} alt="icon-dots" />
                </div>
                <div className="ModalAllOpts-btn" onClick={onClickImport}>
                    Import playlist
                </div>
                <div className="ModalAllOpts-btn" onClick={onClickExport}>
                    Export playlist
                </div>
                <Link to={'/'}>
                    <div className="ModalAllOpts-btn">Home</div>
                </Link>
                {/*
                <div className="ModalAllOpts-btn" onClick={this.handleCancel}>
                    Share
                </div>
                <div className="ModalAllOpts-btn" onClick={this.handleCancel}>
                    Auto sort
                </div>
                */}
                <div className="ModalAllOpts-btn" onClick={onClickHelp}>
                    Help
                </div>
            </div>
        );
    }
}

export default connect()(ModalAllOpts);
