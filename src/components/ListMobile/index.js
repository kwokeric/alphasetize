import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import './style.css';
import controller from './controller';
import CloseIcon from '../../assets/close.svg';
import cx from '../../utils/cx.js';
import TrackActions from '../../redux/actions/TrackActions';

class ListMobile extends Component {
    static defaultProps = {
        list: []
    };

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: -1,
            dragStartIndex: -1,
            dragEndIndex: -1,
            perfectMatches: [],
            keyMatches: [],
            modeMatches: []
        };
    }

    componentDidUpdate(prevProps) {
        const { list } = this.props;

        if (controller.hasListChanged(list, prevProps.list)) {
            // this.setMatches();
        }
    }

    handleSelect = idx => {
        const { activeIndex } = this.state;

        if (activeIndex === idx) {
            this.resetMatches();
        } else {
            this.setMatches(idx);
        }
    };

    setMatches = idx => {
        const { list } = this.props;

        if (idx < 0) {
            // prevent error
            return;
        }

        const {
            perfectMatches,
            keyMatches,
            modeMatches
        } = controller.getMatches(idx, list);

        this.setState({
            activeIndex: idx,
            perfectMatches,
            keyMatches,
            modeMatches
        });
    };

    resetMatches = () => {
        this.setState({
            activeIndex: -1,
            perfectMatches: [],
            keyMatches: [],
            modeMatches: []
        });
    };

    handleTouchDown = idx => {
        window.addEventListMobileener('touchmove', this.handleTouchMove);
        console.log('touchdown');
        this.setState({
            dragStartIndex: idx
        });
    };

    handleTouchMove = () => {
        window.removeEventListMobileener('touchmove', this.handleTouchMove);
        window.addEventListMobileener('touchcancel', this.handleTouchEnd);
        window.addEventListMobileener('touchend', this.handleTouchEnd);
        console.log('touchMove');

        this.setState({
            isDragging: true
        });
    };

    handleTouchEnd = () => {
        window.removeEventListMobileener('mousemove', this.handleMouseMove);

        const { dispatch } = this.props;
        const {
            isDragging,
            activeIndex,
            dragStartIndex,
            hoverIndex
        } = this.state;

        // if dragging track that was first selected, update that index
        const newActiveIndex =
            activeIndex === dragStartIndex ? hoverIndex : activeIndex;

        if (isDragging && dragStartIndex > -1) {
            this.setState({ isDragging: false, activeIndex: newActiveIndex });
            dispatch(
                TrackActions.moveTrack({
                    startIndex: dragStartIndex,
                    endIndex: hoverIndex
                })
            );
        }
    };

    handleRemove = e => {
        e.stopPropagation();
        const { dispatch } = this.props;
        const { hoverIndex } = this.state;

        return dispatch(TrackActions.removeTrack(hoverIndex));
    };

    renderItem = ({
        acousticness,
        artists,
        camKey,
        danceability,
        duration,
        energy,
        id,
        key,
        mode,
        name,
        previewUrl,
        tempo,
        timeSignature,
        valence,
        idx
    }) => {
        const {
            isDragging,
            activeIndex,
            hoverIndex,
            perfectMatches,
            keyMatches,
            modeMatches
        } = this.state;

        const isActive = activeIndex === idx;
        const isHovered = !isDragging && hoverIndex === idx;
        const isDragOver = isDragging && hoverIndex === idx;
        const isPerfectMatch = perfectMatches.includes(idx);
        const isKeyMatch = keyMatches.includes(idx);
        const isModeMatch = modeMatches.includes(idx);

        return (
            <li
                className={cx('ListMobile-item', {
                    'ListMobile-item-hover': isHovered && !isDragging,
                    'ListMobile-item-drag-over': isDragOver && !isActive,
                    'ListMobile-item-active': isActive,
                    'ListMobile-item-active-hover': isActive && isHovered,
                    'ListMobile-item-perfect-match': isPerfectMatch,
                    'ListMobile-item-perfect-match-hover':
                        isPerfectMatch && isHovered,
                    'ListMobile-item-key-match': isKeyMatch,
                    'ListMobile-item-key-match-hover': isKeyMatch && isHovered,
                    'ListMobile-item-mode-match': isModeMatch,
                    'ListMobile-item-mode-match-hover': isModeMatch && isHovered
                })}
                key={id + idx}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onClick={() => this.handleSelect(idx)}
            >
                <div className="ListMobile-item-sub ListMobile-item-order">
                    {idx + 1}
                </div>
                <div className="ListMobile-item-info">
                    <div className="ListMobile-item-sub ListMobile-item-title">
                        <span>{name}</span>
                    </div>
                    <div className="ListMobile-item-sub ListMobile-item-artist">
                        <span>{artists}</span>
                    </div>
                </div>
                <div className="ListMobile-item-sub ListMobile-item-cam-key">
                    {camKey}
                </div>
                <div
                    className="ListMobile-item-sub ListMobile-item-close"
                    onClick={this.handleRemove}
                >
                    <img src={CloseIcon} alt="x" width="12px" height="12px" />
                </div>
            </li>
        );
    };

    render() {
        const { list } = this.props;

        return (
            <div className="ListMobile-container">
                <ul
                    className="ListMobile"
                    onMouseLeave={this.handleMouseLeaveListMobile}
                >
                    {map(list, (track, idx) => {
                        return this.renderItem({ ...track, idx });
                    })}
                </ul>
            </div>
        );
    }
}

export default connect()(ListMobile);
