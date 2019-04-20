import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import './style.css';
import controller from './controller.js';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
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

    handleFocus = () => {
        this.setState({
            isActive: true
        });
    };

    handleBlur = () => {
        this.setState({
            isActive: false
        });
    };

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
        const { index } = this.state;

        return (
            <div className="Search-item-container" key={item + idx}>
                <div className="Search-item">
                    {controller.getArtists(item.artists, item.featured)}
                    {' - '}
                    <span className="Search-item-title"> {item.title}</span>
                </div>
            </div>
        );
    };

    render() {
        const { isActive, value } = this.state;

        return (
            <div className="Search">
                <div
                    className={`Search-container ${
                        isActive ? 'Search-container-active' : ''
                    }`}
                >
                    <div className="Search-input-container">
                        <input
                            className="Search-input"
                            onBlur={this.handleBlur}
                            onChange={e => this.handleChange(e)}
                            onFocus={this.handleFocus}
                            onKeyDown={e => this.handleKeyDown(e)}
                            size="xl"
                            value={value}
                        />
                    </div>
                    {isActive && this.renderSuggestions()}
                </div>
            </div>
        );
    }
}

export default connect()(Search);
