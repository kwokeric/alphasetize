import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './style.css';
import AuthButton from '../AuthButton';
import controller from './controller.js';
import CamelotWheel from '../../assets/camelotWheel.jpg';
import IconBulb from '../../assets/icon-bulb.svg';
import IconGear from '../../assets/icon-gear.svg';
import IconQuestion from '../../assets/icon-question.svg';
import cx from '../../utils/cx.js';
import appUtils from '../../utils/appUtils.js';
import urlUtils from '../../utils/urlUtils.js';

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandHow: false
        };

        this.imageRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = e => {
        console.log(
            'isInside',
            controller.isMouseInsideImage({ e, img: this.imageRef.current })
        );
    };

    handleExpandHow = () => {
        this.setState({
            expandHow: true
        });
    };

    handleCollapseHow = () => {
        this.setState({
            expandHow: false
        });
    };

    renderSpotifyAuth = () => {
        return (
            <div className="About-auth-section">
                <div className="About-auth-container">
                    <AuthButton />
                </div>
            </div>
        );
    };

    renderWheel = isForMobile => {
        return (
            <div
                className={cx('About-image-container', {
                    'About-image-container-mweb': isForMobile
                })}
            >
                <img
                    className="About-image"
                    ref={this.imageRef}
                    src={CamelotWheel}
                    alt="camelotWheel"
                />
            </div>
        );
    };

    render() {
        const { expandHow } = this.state;
        return (
            <div className="About">
                <div className="About-content">
                    <div className="About-top">
                        <div className="About-title-section">
                            <h1 className="About-header">
                                Your sets in harmony
                            </h1>
                            <h2 className="About-header-2">
                                Alphasetize helps you order songs in your sets
                                based on key compatibility.
                            </h2>
                            {this.renderSpotifyAuth()}
                        </div>
                        {this.renderWheel()}
                    </div>
                    <div className="About-section">
                        {this.renderWheel(true)}
                        <div className="About-description">
                            <div className="About-description-tile">
                                <img
                                    className="About-icon"
                                    src={IconQuestion}
                                    alt="icon-question"
                                />
                                <div className="About-subheader">
                                    The Problem
                                </div>
                                Have you ever noticed the uncomfortable
                                dissonance when mixing two songs with clashing
                                pitches?
                            </div>
                            <div className="About-description-tile">
                                <img
                                    className="About-icon"
                                    src={IconBulb}
                                    alt="icon-bulb"
                                />
                                <div className="About-subheader">
                                    The Solution
                                </div>
                                Alphasetize shows you which songs are
                                harmonically compatible to keep transitions
                                silky smooth.
                            </div>
                            <div className="About-description-tile">
                                <img
                                    className="About-icon"
                                    src={IconGear}
                                    alt="icon-gear"
                                />
                                <div className="About-subheader">
                                    How it works
                                </div>
                                The Camelot wheel is a visual representation of
                                which keys are compatible with each other.{' '}
                                {!expandHow && (
                                    <Fragment>
                                        <br />
                                        <span
                                            className="About-link"
                                            onClick={this.handleExpandHow}
                                        >
                                            Read more >
                                        </span>
                                    </Fragment>
                                )}
                                {expandHow && (
                                    <span>
                                        Each key is assigned a keycode number
                                        from one to twelve, like hours around a
                                        clock.
                                        <br />
                                        <br />
                                        To select a compatible song, choose a
                                        keycode within one "hour" of your
                                        current keycode. You can move to an
                                        adjacent key within each ring (the next
                                        "hour"), or to a section in the adjacent
                                        ring in the same "hour".
                                        <br />
                                        <span
                                            className="About-link"
                                            onClick={this.handleCollapseHow}
                                        >
                                            Read less ^
                                        </span>
                                        <br />
                                        <a
                                            className="About-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href="http://www.harmonic-mixing.com/howto.aspx"
                                        >
                                            Read even more >
                                        </a>
                                    </span>
                                )}
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

export default withRouter(connect(mapStateToProps)(About));
