import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';
import cx from '../../utils/cx.js';

class Modal extends Component {
    static defaultProps = {
        children: {},
        onHidePopup: () => {}
    };

    handleBackdropClick = e => {
        if (e) {
            e.stopPropagation();
        }

        if (e.target === e.currentTarget) {
            this.props.onHidePopup();
        }
    };

    render() {
        const { children } = this.props;
        const childClassName = children.props ? children.props.className : '';

        return (
            <div className="Modal">
                {React.cloneElement(children, {
                    className: cx('Modal-children', childClassName)
                })}
            </div>
        );
    }
}

export default connect()(Modal);
