import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import cx from '../../utils/cx.js';

import './style.css';
import IconX from '../../assets/icon-x.svg';

const ESC_KEYCODE = 27;

class Input extends React.Component {
    static defaultProps = {
        border: true,
        className: '',
        customTagClassName: null,
        disabled: false,
        error: '',
        fixedSize: false,
        isActive: false,
        label: '',
        onCancel: () => {},
        onClear: () => {},
        required: false,
        size: 'md',
        type: 'text'
    };

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    handleClear = () => {
        const { onClear } = this.props;
        onClear();
        this.focusInput();
    };

    focusInput = () => {
        this.input.current.focus();
    };

    handleKeyDown = e => {
        const { onKeyDown } = this.props;
        const keyCode = e.which;
        /*
         * necessary for any component using Input that has also has a listener on ESC key because without
         * calling onKeyDown explicitly, ESC would blur the input and the event would not bubble up
         */
        if (keyCode === ESC_KEYCODE) {
            e.target.blur();
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    };

    render() {
        const {
            border,
            className,
            customTagClassName,
            disabled,
            error,
            fixedSize,
            full,
            includeClear,
            label,
            size,
            type,
            value
        } = this.props;
        const rest = omit(this.props, [
            'border',
            'customTagClassName',
            'dispatch',
            'error',
            'fixedSize',
            'full',
            'includeClear',
            'isActive',
            'label',
            'size'
        ]);
        const CustomTag = type === 'textarea' ? 'textarea' : 'input';

        return (
            <div className={cx('Input', className)}>
                {label && <div className="Input-label">{label}</div>}
                <CustomTag
                    {...rest}
                    className={cx('Input-element', customTagClassName, {
                        'Input-disabled': disabled,
                        'Input-element-border': border,
                        'Input-element-no-border': !border,
                        'Input-error': error,
                        'Input-fixed-size': fixedSize,
                        'Input-full': full,
                        'Input-lg': size === 'lg',
                        'Input-xl': size === 'xl',
                        'Input-textarea': type === 'textarea',
                        'Utils-text-overflow': type !== 'textarea'
                    })}
                    ref={this.input}
                    onKeyDown={this.handleKeyDown}
                />
                {includeClear &&
                    value && (
                        <div
                            className="Input-x Utils-horiz-center"
                            onClick={this.handleClear}
                        >
                            <img
                                alt="IconX"
                                src={IconX}
                                className="Input-icon-x"
                                height="18"
                                width="18"
                            />
                        </div>
                    )}
                {error && <div className="Input-alert">{error}</div>}
            </div>
        );
    }
}
export default connect(
    null,
    null,
    null,
    { forwardRef: true }
)(Input);
