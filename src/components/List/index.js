import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import './style.css';

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        // create Input ref and set to active
    }

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
        valence
    }) => {
        return (
            <li className="List-item" key={id}>
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
                        return this.renderItem({ ...track, idx });
                    })}
                </ul>
            </div>
        );
    }
}

export default connect()(List);
