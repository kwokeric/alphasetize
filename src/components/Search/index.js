import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpotifyActions from '../../redux/actions/SpotifyActions';

import './style.css';
import controller from './controller.js';
import cx from '../../utils/cx.js';
import debounce from '../../utils/debounce.js';

const KEYCODES = {
    ESC: 27,
    ENTER: 13,
    UP_ARROW: 38,
    DOWN_ARROW: 40
};

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            isActive: false,
            suggestions: [],
            value: ''
        };
    }

    componentDidMount() {
        // create Input ref and set to active
    }

    handleFocus = () => {
        this.setState({
            isActive: true
        });
    };

    handleBlur = () => {
        // this.setState({
        //     isActive: false
        // });
    };

    handleMouseOver = index => {
        this.setState({
            index
        });
    };

    handleMouseLeave = () => {
        this.setState({
            index: -1
        });
    };

    handleChange = e => {
        const query = e.target.value;

        this.setState({
            value: query
        });

        this.getResults(query);
    };

    getResults = debounce(query => {
        const { dispatch } = this.props;
        const { value } = this.state;

        return dispatch(SpotifyActions.getSearchResults(value)).then(
            suggestions => {
                if (suggestions.length) {
                    this.setState({
                        suggestions
                    });
                } else {
                    this.setState({
                        suggestions: []
                    });
                }
            }
        );
    }, 100);

    handleKeyDown = e => {
        const { index, suggestions } = this.state;
        const keyCode = e.which;

        if (keyCode === KEYCODES.UP_ARROW) {
            const prevIndex = Math.max(index - 1, 0);
            this.setState({ index: prevIndex });
            e.preventDefault();
        } else if (keyCode === KEYCODES.DOWN_ARROW) {
            const nextIndex = Math.min(index + 1, suggestions.length - 1);
            this.setState({ index: nextIndex });
            e.preventDefault();
        } else if (keyCode === KEYCODES.ESC) {
            e.preventDefault();
        } else if (keyCode === KEYCODES.ENTER) {
            e.preventDefault();
        }
    };

    renderSuggestions = () => {
        const { suggestions } = this.state;

        if (!suggestions.length) {
            return null;
        }

        return (
            <div
                className="Search-suggestions-container"
                onMouseLeave={this.handleMouseLeave}
            >
                {suggestions.map((item, idx) => this.renderItem(item, idx))}
            </div>
        );
    };

    renderItem = (item, idx) => {
        const { index } = this.state;

        return (
            <div
                className={cx('Search-item-container', {
                    'Search-item-container-active': index === idx
                })}
                onMouseOver={() => this.handleMouseOver(idx)}
                key={item + idx}
            >
                <div className="Search-item">
                    {controller.getArtists(item.artists, item.featured)}
                    {' - '}
                    {item.name}
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

const mapStateToProps = state => {
    return {
        token: state.spotify.token
    };
};

export default connect(mapStateToProps)(Search);
