import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import map from 'lodash/map';

import TrackActions from '../../redux/actions/TrackActions';
import './style.css';
import controller from './controller';
import cx from '../../utils/cx.js';
import CloseIcon from '../../assets/close.svg';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hoverIndex: -1,
            activeIndex: -1,
            perfectMatches: [],
            keyMatches: [],
            modeMatches: []
        };
    }

    handleMouseDown = e => {
        if (!ReactDOM.findDOMNode(this).contains(e.target)) {
            this.setState({
                isActive: false
            });
        }
    };

    handleMouseOver = hoverIndex => {
        this.setState({
            hoverIndex
        });
    };

    handleMouseLeave = () => {
        this.setState({
            hoverIndex: -1
        });
    };

    handleSelect = () => {
        const { list } = this.props;
        const { hoverIndex } = this.state;

        const {
            perfectMatches,
            keyMatches,
            modeMatches
        } = controller.getMatches(hoverIndex, list);

        this.setState({
            activeIndex: hoverIndex,
            perfectMatches,
            keyMatches,
            modeMatches
        });
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
            activeIndex,
            hoverIndex,
            perfectMatches,
            keyMatches,
            modeMatches
        } = this.state;

        const isActive = activeIndex === idx;
        const isHovered = hoverIndex === idx;
        const isPerfectMatch = perfectMatches.includes(idx);
        const isKeyMatch = keyMatches.includes(idx);
        const isModeMatch = modeMatches.includes(idx);

        return (
            <li
                className={cx('List-item', {
                    'List-item-hover': isHovered,
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
                <ul className="List">
                    <li onMouseOver={this.handleMouseLeave}>
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
