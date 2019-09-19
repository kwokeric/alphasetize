import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './style.css';
import IconBulb from '../../assets/icon-bulb.svg';
import IconGear from '../../assets/icon-gear.svg';
import IconQuestion from '../../assets/icon-question.svg';

class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <div className="Contact-content">
                    <div className="Contact-top">
                        <div className="Contact-title-section">
                            <h1 className="Contact-header">Contact</h1>
                            <h2 className="Contact-header-2">
                                Alphasetize was created with love by Eric Kwok
                            </h2>
                        </div>
                    </div>
                    <div className="Contact-section">
                        <div className="Contact-description">
                            <div className="Contact-description-tile">
                                <img
                                    className="Contact-icon"
                                    src={IconQuestion}
                                    alt="icon-question"
                                />
                                <div className="Contact-subheader">
                                    The Problem
                                </div>
                                Have you ever noticed the uncomfortable
                                dissonance when mixing two songs with clashing
                                pitches?
                            </div>
                            <div className="Contact-description-tile">
                                <img
                                    className="Contact-icon"
                                    src={IconBulb}
                                    alt="icon-bulb"
                                />
                                <div className="Contact-subheader">
                                    The Solution
                                </div>
                                Alphasetize shows you which songs are
                                harmonically compatible to keep transitions
                                silky smooth.
                            </div>
                            <div className="Contact-description-tile">
                                <img
                                    className="Contact-icon"
                                    src={IconGear}
                                    alt="icon-gear"
                                />
                                <div className="Contact-subheader">
                                    How it works
                                </div>
                                The Camelot wheel is a visual representation of
                                which keys are compatible with each other.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isMobile: state.app.isMobile
    };
};

export default withRouter(connect(mapStateToProps)(Contact));
