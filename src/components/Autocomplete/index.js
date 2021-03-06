import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import SearchActions from '../../redux/actions/SearchActions';

import './style.css';
import controller from './controller.js';
import cx from '../../utils/cx.js';
import Input from '../../core/input/index.js';
import IconBack from '../../assets/icon-left-arrow.svg';
import IconSearch from '../../assets/icon-search-gray.svg';
import debounce from '../../utils/debounce.js';

const KEYCODES = {
    ESC: 27,
    ENTER: 13,
    UP_ARROW: 38,
    DOWN_ARROW: 40
};

class Autocomplete extends Component {
    static defaultProps = {
        onBlur: () => {},
        onFocus: () => {}
    };

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

    componentWillUnmount() {
        window.removeEventListener('mousedown', this.handleMouseDown);
    }

    handleFocus = () => {
        this.props.onFocus();

        window.addEventListener('mousedown', this.handleMouseDown);

        this.setState({
            isActive: true
        });
    };

    handleMouseDown = e => {
        if (!ReactDOM.findDOMNode(this).contains(e.target)) {
            this.handleClose();
        }
    };

    handleClose = () => {
        const { onBlur } = this.props;
        this.setState({
            isActive: false
        });
        onBlur();
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

        this.getResults();
    };

    getResults = debounce(() => {
        const { dispatch } = this.props;
        const { value } = this.state;

        return dispatch(SearchActions.getTrackBasicByQuery(value)).then(
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
            this.handleSelect();
        }
    };

    onClear = () => {
        this.setState({
            value: ''
        });
    };

    handleSelect = e => {
        const { dispatch } = this.props;
        const { index, suggestions } = this.state;
        const selection = suggestions[index];

        this.handleClose();
        return dispatch(SearchActions.getTrackWithBasicAndFeatures(selection));
    };

    renderSuggestions = () => {
        const { suggestions, value } = this.state;

        return (
            <div
                className={cx('Autocomplete-suggestions-container', {
                    'Autocomplete-suggestions-container-empty':
                        !suggestions.length || !value
                })}
                onMouseLeave={this.handleMouseLeave}
            >
                {value &&
                    suggestions.map((item, idx) => this.renderItem(item, idx))}
            </div>
        );
    };

    renderItem = (item, idx) => {
        const { index } = this.state;

        return (
            <div
                className={cx('Autocomplete-item-container', {
                    'Autocomplete-item-container-active': index === idx
                })}
                onMouseOver={() => this.handleMouseOver(idx)}
                onClick={this.handleSelect}
                key={item + idx}
            >
                <div className="Autocomplete-item">
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
            <div
                className={cx('Autocomplete-container', {
                    'Autocomplete-container-active': isActive
                })}
            >
                <div className="Autocomplete-input-container">
                    {isActive ? (
                        <img
                            alt="IconSearch"
                            src={IconBack}
                            className="Autocomplete-icon-back"
                            height="16"
                            width="16"
                            onClick={this.handleClose}
                        />
                    ) : (
                        <img
                            alt="IconSearch"
                            src={IconSearch}
                            className="Autocomplete-icon-search"
                            height="16"
                            width="16"
                        />
                    )}
                    <Input
                        className="Autocomplete-input"
                        border={false}
                        full
                        includeClear
                        isActive={isActive}
                        onChange={e => this.handleChange(e)}
                        onFocus={this.handleFocus}
                        onClear={this.onClear}
                        onKeyDown={e => this.handleKeyDown(e)}
                        size="xl"
                        value={value}
                    />
                </div>
                {isActive && this.renderSuggestions()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isMobile: state.app.isMobile // not used
    };
};

export default connect(mapStateToProps)(Autocomplete);
