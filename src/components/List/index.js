import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import TrackActions from '../../redux/actions/TrackActions';
import './style.css';
import controller from './controller';
import cx from '../../utils/cx.js';
import CloseIcon from '../../assets/close.svg';

class List extends Component {
    static defaultProps = {
        list: []
    };

    constructor(props) {
        super(props);

        this.state = {
            hoverIndex: -1,
            activeIndex: -1,
            dragIndex: -1,
            perfectMatches: [],
            keyMatches: [],
            modeMatches: []
        };
    }

    componentDidUpdate(prevProps) {
        const { list } = this.props;

        if (prevProps.list.length !== list.length) {
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
        const { hoverIndex } = this.state;
        window.removeEventListener('mousemove', this.handleMouseMove);
        this.setState({
            isDragging: true,
            activeIndex: hoverIndex,
            dragIndex: hoverIndex
        });
    };

    handleMouseUp = () => {
        const { dispatch } = this.props;
        const { isDragging, dragIndex, hoverIndex } = this.state;
        window.removeEventListener('mousemove', this.handleMouseMove);

        if (isDragging && dragIndex > -1) {
            this.setState({ isDragging: false });
            dispatch(
                TrackActions.moveTrack({
                    startIndex: dragIndex,
                    endIndex: hoverIndex
                })
            );
        }
    };

    handleRemove = e => {
        console.log('remove');
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
            <div className="List-container">
                <ul className="List" onMouseLeave={this.handleMouseLeaveList}>
                    <li onMouseOver={this.handleMouseOverHeader}>
                        <div className="List-item-header">
                            <div className="List-item-sub List-item-order">
                                #
                            </div>
                            <div className="List-item-sub List-item-artist">
                                ARTIST
                            </div>
                            <div className="List-item-sub List-item-title">
                                TITLE
                            </div>
                            <div className="List-item-sub List-item-cam-key">
                                CODE
                            </div>
                            <div className="List-item-sub List-item-key">
                                KEY
                            </div>
                            <div className="List-item-sub List-item-tempo">
                                TEMPO
                            </div>
                            <div className="List-item-sub List-item-energy">
                                ENERGY
                            </div>
                            <div className="List-item-sub List-item-close" />
                        </div>
                    </li>
                    {map(list, (track, idx) => {
                        return this.renderItem({ ...track, idx });
                    })}
                </ul>
            </div>
        );
    }
}

export default connect()(List);
