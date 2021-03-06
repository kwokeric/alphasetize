import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import AuthButton from '../AuthButton';
import Wheel from '../Wheel';

import './style.css';
import appUtils from '../../utils/appUtils.js';
import constants from '../../constants';
import urlUtils from '../../utils/urlUtils.js';

import IconBulb from '../../assets/icon-bulb.svg';
import IconGear from '../../assets/icon-gear.svg';
import IconQuestion from '../../assets/icon-question.svg';
import Image from '../../assets/controller.jpg';

class About extends Component {
    constructor(props) {
        super(props);

        this.imgRef = React.createRef();
    }

    componentDidMount() {
        if (!this.imgRef.current) return;

        const options = {
            root: null,
            rootMargin: '-100px',
            threshold: 0.0
        };

        this.observer = new IntersectionObserver(
            this.observerCallback,
            options
        );
        this.observer.observe(this.imgRef.current);
    }

    componentWillUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(this.imgRef.current);
                this.isTopVisible = true;
                this.forceUpdate();
            }
        });
    };

    handleSpotifyAuth = e => {
        e.preventDefault();
        const { token, history } = this.props;
        const urlParams = urlUtils.getUrlParams();

        if (!urlParams.access_token && !token) {
            window.location.href = appUtils.getSpotifyAuthUrl();
        } else {
            console.log('Already authenticated!');
            history.push(constants.CREAT_URI);
        }
    };

    renderTop = () => {
        const { isMobile } = this.props;

        return (
            <section>
                <div className="About-section About-top">
                    <div className="About-title-section">
                        <h1 className="About-header">
                            Your sets <br /> in harmony
                        </h1>
                        <h2 className="About-header-2">
                            Alphasetize helps you order songs in your sets based
                            on key compatibility.
                        </h2>
                        <div className="About-auth-section">
                            <div className="About-auth-container">
                                <AuthButton />
                            </div>
                        </div>
                    </div>
                    <div className="About-scene">
                        <img
                            className={`About-controller-img ${
                                this.isTopVisible && 'visible'
                            }`}
                            alt="controller-img"
                            src={Image}
                            ref={this.imgRef}
                        />
                    </div>
                    {!isMobile && false && <Wheel />}
                </div>
            </section>
        );
    };

    renderOutline = () => {
        return (
            <section className="About-white">
                <div className="About-section">
                    <div className="About-description">
                        <div className="About-description-tile">
                            <div className="About-description-top">
                                <img
                                    className="About-icon"
                                    src={IconQuestion}
                                    alt="icon-question"
                                />
                                <div className="About-subheader">
                                    The Problem
                                </div>
                            </div>
                            <div className="About-p">
                                Have you ever noticed the uncomfortable
                                dissonance when mixing two songs with clashing
                                pitches?
                                <div className="About-link">
                                    <a
                                        className="link"
                                        href="https://study.com/academy/lesson/dissonant-definition-music-harmony-chords.html"
                                    >
                                        Dissonance?
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="About-description-tile">
                            <div className="About-description-top">
                                <img
                                    className="About-icon"
                                    src={IconBulb}
                                    alt="icon-bulb"
                                />
                                <div className="About-subheader">
                                    The Solution
                                </div>
                            </div>
                            <div className="About-p">
                                Alphasetize shows you which songs are
                                harmonically compatible to keep transitions
                                silky smooth.
                                <div className="About-link">
                                    <a
                                        className="link"
                                        href="/create"
                                        onClick={this.handleSpotifyAuth}
                                    >
                                        Link your Spotify account
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="About-description-tile">
                            <div className="About-description-top">
                                <img
                                    className="About-icon"
                                    src={IconGear}
                                    alt="icon-gear"
                                />
                                <div className="About-subheader">
                                    How it works
                                </div>
                            </div>
                            <div className="About-p">
                                The Camelot wheel is a visual representation of
                                which keys are compatible with each other.
                                <div className="About-link">
                                    <a className="link" href="#camelot-wheel">
                                        Read more below
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    };

    renderHowTo = () => {
        return (
            <section>
                <div
                    id="camelot-wheel"
                    className="About-section About-section-4"
                >
                    <div className="About-section-left">
                        <h3 className="About-header-3">The Camelot Wheel</h3>
                        <div className="About-subsection">
                            The camelot wheel is visual aid for harmonic mixing.
                            Each musical key is assigned a keycode number from
                            one to twelve, like hours around a clock.
                            <br />
                            <br />
                            There are two ways to select a compatible song:
                            <div className="About-numeral">
                                <span className="gray">1.</span> Adjacent Hours.
                                Choose a keycode within one "hour" of your
                                current keycode. For example: if you are in 8A,
                                you can play 7A, 8A or 9A next.
                            </div>
                            <div className="About-numeral">
                                <span className="gray">2.</span> Adjacent Rings.
                                You can also mix between inner and outer wheels
                                if you stay in the same "hour." For example, try
                                mixing from 8A to 8B, and notice the change in
                                melody as you go from Minor to Major.
                            </div>
                            <div className="About-link">
                                <a
                                    className="link"
                                    href="#camelot-wheel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="http://www.harmonic-mixing.com/howto.aspx"
                                >
                                    Learn more
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="About-section-right">
                        <Wheel />
                    </div>
                </div>
            </section>
        );
    };

    render() {
        return (
            <div className="About">
                {this.renderTop()}
                {this.renderOutline()}
                {this.renderHowTo()}
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
