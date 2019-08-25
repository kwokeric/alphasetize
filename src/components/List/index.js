import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import './style.css';
import controller from './controller';
import CloseIcon from '../../assets/close.svg';
import cx from '../../utils/cx.js';
import TrackActions from '../../redux/actions/TrackActions';

class List extends Component {
    static defaultProps = {
        list: []
    };

    constructor(props) {
        super(props);

        this.state = {
            hoverIndex: -1,
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
            this.setMatches(true);
        }
    }

    handleMouseOver = hoverIndex => {
        this.setState({
            hoverIndex
        });
    };

    handleMouseLeaveList = () => {
        this.setState({ isDragging: false });
    };

    handleMouseOverHeader = () => {
        this.setState({
            hoverIndex: -1
        });
    };

    handleSelect = () => {
        const { activeIndex, hoverIndex } = this.state;

        if (activeIndex === hoverIndex) {
            this.resetMatches();
        } else {
            this.setMatches();
        }
    };

    setMatches = shouldUseActive => {
        const { list } = this.props;
        const { activeIndex, hoverIndex } = this.state;

        const index = shouldUseActive ? activeIndex : hoverIndex;
        if (index < 0) {
            // prevent error
            return;
        }

        const {
            perfectMatches,
            keyMatches,
            modeMatches
        } = controller.getMatches(index, list);

        this.setState({
            activeIndex: index,
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

    handleMouseDown = () => {
        window.addEventListener('mousemove', this.handleMouseMove);
    };

    handleMouseMove = () => {
        window.removeEventListener('mousemove', this.handleMouseMove);

        const { hoverIndex } = this.state;
        this.setState({
            isDragging: true,
            dragStartIndex: hoverIndex
        });
    };

    handleMouseUp = () => {
        window.removeEventListener('mousemove', this.handleMouseMove);

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
                className={cx('List-item', {
                    'List-item-hover': isHovered && !isDragging,
                    'List-item-drag-over': isDragOver && !isActive,
                    'List-item-active': isActive,
                    'List-item-active-hover': isActive && isHovered,
                    'List-item-perfect-match': isPerfectMatch,
                    'List-item-perfect-match-hover':
                        isPerfectMatch && isHovered,
                    'List-item-key-match': isKeyMatch,
                    'List-item-key-match-hover': isKeyMatch && isHovered,
                    'List-item-mode-match': isModeMatch,
                    'List-item-mode-match-hover': isModeMatch && isHovered
                })}
                key={id + idx}
                onMouseOver={() => this.handleMouseOver(idx)}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onClick={this.handleSelect}
            >
                <div className="List-item-sub List-item-order">{idx + 1}</div>
                <div className="List-item-sub List-item-artist">
                    <span>{artists}</span>
                </div>
                <div className="List-item-sub List-item-title">
                    <span>{name}</span>
                </div>
                <div className="List-item-sub List-item-cam-key">{camKey}</div>
                <div className="List-item-sub List-item-key">{key}</div>
                <div className="List-item-sub List-item-tempo">{tempo}</div>
                <div className="List-item-sub List-item-energy">{energy}</div>
                <div
                    className="List-item-sub List-item-close"
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
            <Fragment>
                <div
                    className="List-item-header"
                    onMouseOver={this.handleMouseOverHeader}
                >
                    <Fragment>
                        <div className="List-item-sub List-item-order">#</div>
                        <div className="List-item-sub List-item-artist">
                            ARTIST
                        </div>
                        <div className="List-item-sub List-item-title">
                            TITLE
                        </div>
                        <div className="List-item-sub List-item-cam-key">
                            CODE
                        </div>
                        <div className="List-item-sub List-item-key">KEY</div>
                        <div className="List-item-sub List-item-tempo">
                            TEMPO
                        </div>
                        <div className="List-item-sub List-item-energy">
                            ENERGY
                        </div>
                        <div className="List-item-sub List-item-close" />
                    </Fragment>
                </div>

                <div className="List-container">
                    <ul
                        className="List"
                        onMouseLeave={this.handleMouseLeaveList}
                    >
                        {map(list, (track, idx) => {
                            return this.renderItem({ ...track, idx });
                        })}
                    </ul>
                </div>
            </Fragment>
        );
    }
}

export default connect()(List);
