import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import map from 'lodash/map';

import './style.css';
import cx from '../../utils/cx.js';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: -1
        };
    }

    handleMouseDown = e => {
        if (!ReactDOM.findDOMNode(this).contains(e.target)) {
            this.setState({
                isActive: false
            });
        }
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

    renderItem = ({
        acousticness,
        artists,
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
        const { index } = this.state;

        return (
            <li
                className={cx('List-item', {
                    'List-item-active': index === idx
                })}
                key={id}
                onMouseOver={() => this.handleMouseOver(idx)}
                onClick={this.handleSelect}
            >
                <div className="List-item-sub List-item-order">{idx + 1}</div>
                <div className="List-item-sub List-item-artist">{artists}</div>
                <div className="List-item-sub List-item-title">{name}</div>
                <div className="List-item-sub List-item-key">{key}</div>
                <div className="List-item-sub List-item-tempo">{tempo}</div>
                <div className="List-item-sub List-item-energy">{energy}</div>
            </li>
        );
    };

    render() {
        // add results here
        const { list } = this.props;

        return (
            <div className="List-container">
                <ul className="List">
                    <li>
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
                            <div className="List-item-sub List-item-key">
                                KEY
                            </div>
                            <div className="List-item-sub List-item-tempo">
                                TEMPO
                            </div>
                            <div className="List-item-sub List-item-energy">
                                ENERGY
                            </div>
                        </div>
                    </li>
                    {map(list, (track, idx) => {
                        console.log(idx);
                        return this.renderItem({ ...track, idx });
                    })}
                </ul>
            </div>
        );
    }
}

export default connect()(List);
