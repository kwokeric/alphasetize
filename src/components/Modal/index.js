import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import './style.css';

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
                <div
                    className="Modal-overlay"
                    onClick={this.handleBackdropClick}
                />
                {React.cloneElement(children, {
                    className: cx('Modal-children', childClassName)
                })}
            </div>
        );
    }
}

export default connect()(Modal);
