import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import cx from '../../utils/cx.js';
import appUtils from '../../utils/appUtils.js';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {
    static defaultProps = {
        background: true,
        children: {},
        onHideModal: () => {}
    };

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);

        appUtils.lockVerticalScrolling();
        appUtils.addBlur();
    }

    componentWillUnmount() {
        appUtils.unlockVerticalScrolling();
        appUtils.removeBlur();
        modalRoot.removeChild(this.el);
    }

    handleBackdropClick = e => {
        if (e) {
            e.stopPropagation();
        }

        if (e.target === e.currentTarget) {
            this.props.onHideModal();
        }
    };

    render() {
        const { background, children } = this.props;
        const childClassName = children.props ? children.props.className : '';

        return createPortal(
            <div
                className={cx('Modal', { 'Modal-no-background': !background })}
                onClick={this.handleBackdropClick}
            >
                {React.cloneElement(children, {
                    className: cx('Modal-children', childClassName)
                })}
            </div>,
            this.el
        );
    }
}

export default connect()(Modal);
