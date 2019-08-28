import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import cx from '../../utils/cx.js';

import './style.css';

const ESC_KEYCODE = 27;

class Input extends React.Component {
    static defaultProps = {
        border: true,
        borderRadius: false,
        centerText: false,
        className: '',
        customTagClassName: null,
        disabled: false,
        fixedSize: false,
        help: '',
        hpxStyle: '',
        inactive: false,
        includeClear: false,
        includeCancel: false,
        inputButtonGroupPosition: null,
        isActive: false,
        onCancel: () => {},
        onClear: () => {},
        label: '',
        required: false,
        size: 'md',
        type: 'text',
        width: ''
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

    handleCancel = () => {
        const { onCancel } = this.props;
        onCancel();
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
            borderRadius,
            centerText,
            className,
            customTagClassName,
            disabled,
            fixedSize,
            width,
            help,
            hpxStyle,
            inactive,
            includeClear,
            includeCancel,
            inputButtonGroupPosition,
            isActive,
            label,
            required,
            size,
            type,
            value
        } = this.props;
        const rest = omit(this.props, [
            'border',
            'borderRadius',
            'centerText',
            'customTagClassName',
            'dispatch',
            'fixedSize',
            'help',
            'inactive',
            'includeClear',
            'includeCancel',
            'inputButtonGroupPosition',
            'isActive',
            'onCancel',
            'onClear',
            'hpxStyle',
            'label',
            'size',
            'width'
        ]);
        const CustomTag = type === 'textarea' ? 'textarea' : 'input';
        let paddingRight = null;
        if (isActive) {
            if (includeClear && includeCancel && value) {
                paddingRight = 'lg';
            } else if (includeClear || includeCancel) {
                paddingRight = 'md';
            }
        }

        return (
            <div className={cx('Input', className)}>
                {label && (
                    <div>
                        {required && (
                            <span className="Input-required-mark">{'* '}</span>
                        )}
                        {label}
                        {!required && ' (optional)'}
                    </div>
                )}
                {includeClear || includeCancel ? (
                    <div className="Input-container">
                        <CustomTag
                            {...rest}
                            className={cx('Input-element', customTagClassName, {
                                'Input-button-after':
                                    inputButtonGroupPosition === 'after' ||
                                    inputButtonGroupPosition === 'both',
                                'Input-button-before':
                                    inputButtonGroupPosition === 'before' ||
                                    inputButtonGroupPosition === 'both',
                                'Input-center-text': centerText,
                                'Input-disabled': disabled,
                                'Input-element-border-radius': borderRadius,
                                'Input-element-border': border,
                                'Input-element-no-border': !border,
                                'Input-error': hpxStyle === 'error',
                                'Input-fixed-size': fixedSize,
                                'Input-full-width': width === 'full',
                                'Input-inactive': inactive,
                                'Input-lg': size === 'lg',
                                'Input-xl': size === 'xl',
                                'Input-padding-right-lg': paddingRight === 'lg',
                                'Input-padding-right-md': paddingRight === 'md',
                                'Input-textarea': type === 'textarea',
                                'Utils-text-overflow': type !== 'textarea'
                            })}
                            ref={this.input}
                            onKeyDown={this.handleKeyDown}
                        />
                        {isActive &&
                            (includeClear || includeCancel) && (
                                <div className="Input-right">
                                    {includeClear &&
                                        value && (
                                            <div
                                                className="Input-clear Utils-horiz-center"
                                                onClick={this.handleClear}
                                            >
                                                x
                                            </div>
                                        )}
                                    {includeCancel && (
                                        <div
                                            className="Input-cancel Utils-horiz-center"
                                            onClick={this.handleCancel}
                                        >
                                            <div
                                                size="tiny"
                                                className="Input-cancel-text"
                                            >
                                                Cancel
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>
                ) : (
                    <CustomTag
                        {...rest}
                        className={cx('Input-element', customTagClassName, {
                            'Input-button-after':
                                inputButtonGroupPosition === 'after' ||
                                inputButtonGroupPosition === 'both',
                            'Input-button-before':
                                inputButtonGroupPosition === 'before' ||
                                inputButtonGroupPosition === 'both',
                            'Input-center-text': centerText,
                            'Input-disabled': disabled,
                            'Input-element-border-radius': borderRadius,
                            'Input-element-border': border,
                            'Input-element-no-border': !border,
                            'Input-error': hpxStyle === 'error',
                            'Input-fixed-size': fixedSize,
                            'Input-full-width': width === 'full',
                            'Input-inactive': inactive,
                            'Input-lg': size === 'lg',
                            'Input-xl': size === 'xl',
                            'Input-textarea': type === 'textarea',
                            'Utils-text-overflow': type !== 'textarea'
                        })}
                        ref={this.input}
                        onKeyDown={this.handleKeyDown}
                    />
                )}
                {help && (
                    <div size="sm" className="Utils-alert">
                        {help}
                    </div>
                )}
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
