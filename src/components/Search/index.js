import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import './style.css';
import controller from './controller.js';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: true,
            suggestions: [],
            value: ''
        };
    }

    componentDidMount() {
        // create Input ref and set to active
        const suggestions = [
            {
                artists: ['Calvin Harris'],
                featured: ['Sam Smith'],
                title: 'Promises'
            },
            {
                artists: ['Lipless', 'Mahalo', 'Carly Paige'],
                featured: [],
                title: 'Falling'
            },
            {
                artists: ['Ilan Bluestone', 'El Waves'],
                featured: [],
                title: 'Mama Africa - Extended Mix'
            },
            {
                artists: ['Sunny Lax'],
                featured: [],
                title: 'Greenlight'
            },
            {
                artists: ['No Mana'],
                featured: [],
                title: 'Bad Things'
            }
        ];

        this.setState({ suggestions });
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

    renderSuggestions = () => {
        const { suggestions } = this.state;
        return (
            <div className="Search-suggestions-container">
                {suggestions.map((item, idx) => this.renderItem(item, idx))}
            </div>
        );
    };

    renderItem = (item, idx) => {
        const { index, value } = this.state;
        return (
            <div className="Search-item">
                <div className="Search-item-title">
                    {controller.getStyledText(item.title, value)}
                </div>
                <div className="Search-item-artists">
                    {controller.getStyledText(item.artists, value)}
                </div>
            </div>
        );
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
                    {this.renderSuggestions()}
                </div>
            </div>
        );
    }
}

export default connect()(Search);
