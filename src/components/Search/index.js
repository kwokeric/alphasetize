import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import './style.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    handleChange = e => {
        this.setState({
            value: e.target.value
        });

        // axios request here
    };

    handleKeyDown = e => {
        const keyCode = e.which;

        // if (keyCode === constants.UP_ARROW_KEYCODE) {
        //     const prevIndex = index === -1 ? -1 : index - 1;
        //     this.setState({ index: prevIndex });
        //     e.preventDefault();
        // } else if (keyCode === constants.DOWN_ARROW_KEYCODE) {
        //     const nextIndex = index === overMaxIndex ? overMaxIndex : index + 1;
        //     this.setState({ index: nextIndex });
        //     e.preventDefault();
        // } else if (keyCode === constants.ESC_KEYCODE) {
        //     // this.handleToggleDropdown();
        //     e.preventDefault();
        // } else if (keyCode === constants.ENTER_KEYCODE) {
        //     const selectedItem =
        //         items.length > 0 && index === -1 ? items[0] : items[index];
        //     if (selectedItem) {
        //         e.target.blur();
        //         this.setState({ isActive: false });
        //         this.handleSelectItem({ item: selectedItem });
        //     } else {
        //         log.warn(
        //             'User did not select an option. Returning text as value.'
        //         );
        //         this.handleSelectItem({
        //             item: value,
        //             isActive: true,
        //             type: 'userQuery'
        //         });
        //     }
        // }
    };

    render() {
        const { value } = this.state;
        return (
            <div className="Search">
                <div className="Search-input-container">
                    <input
                        className="Search-input"
                        onBlur={e => {
                            //this.handleBlur(e)}
                        }}
                        onChange={e => this.handleChange(e)}
                        onFocus={e => {
                            //this.handleFocus(e)}
                        }}
                        onKeyDown={e => this.handleKeyDown(e)}
                        size="xl"
                        value={value}
                    />
                </div>
            </div>
        );
    }
}

export default connect()(Search);
