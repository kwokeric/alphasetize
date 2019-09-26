import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import AuthButton from '../AuthButton';
import Wheel from '../Wheel';

import './style.css';
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
            rootMargin: '-150px',
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
                this.visible = true;
                this.forceUpdate();
            }
        });
    };

    renderTop = () => {
        const { isMobile } = this.props;

        return (
            <div className="About-section About-top">
                <div className="About-title-section">
                    <h1 className="About-header">Your sets in harmony</h1>
                    <h2 className="About-header-2">
                        Alphasetize helps you order songs in your sets based on
                        key compatibility.
                    </h2>
                    <div className="About-auth-section">
                        <div className="About-auth-container">
                            <AuthButton />
                        </div>
                    </div>
                </div>
                {!isMobile && <Wheel />}
            </div>
        );
    };

    renderOutline = () => {
        const { isMobile } = this.props;

        return (
            <div className="About-section About-section-1">
                {isMobile && <Wheel />}
                <div className="About-description">
                    <div className="About-description-tile">
                        <img
                            className="About-icon"
                            src={IconQuestion}
                            alt="icon-question"
                        />
                        <div className="About-subheader">The Problem</div>
                        Have you ever noticed the uncomfortable dissonance when
                        mixing two songs with clashing pitches?
                    </div>
                    <div className="About-description-tile">
                        <img
                            className="About-icon"
                            src={IconBulb}
                            alt="icon-bulb"
                        />
                        <div className="About-subheader">The Solution</div>
                        Alphasetize shows you which songs are harmonically
                        compatible to keep transitions silky smooth.
                    </div>
                    <div className="About-description-tile">
                        <img
                            className="About-icon"
                            src={IconGear}
                            alt="icon-gear"
                        />
                        <div className="About-subheader">How it works</div>
                        The Camelot wheel is a visual representation of which
                        keys are compatible with each other. Read more{' '}
                        <a className="About-link" href="#camelot-wheel">
                            below
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    renderHowTo = () => {
        return (
            <div id="camelot-wheel" className="About-section About-section-2">
                <div className="About-section-left">
                    <h3 className="About-header-3">The Camelot Wheel</h3>
                    <div className="About-subsection">
                        Each key is assigned a keycode number from one to
                        twelve, like hours around a clock.
                        <br />
                        <br />
                        There are two ways to select a compatible song:
                        <br />
                        1. Choose a keycode within one "hour" of your current
                        keycode. For example: if you are in 8A, you can play 7A,
                        8A or 9A next.
                        <br />
                        <br />
                        2. You can also mix between inner and outer wheels if
                        you stay in the same "hour." For example, try mixing
                        from 8A to 8B, and notice the change in melody as you go
                        from Minor to Major.
                        <br />
                        <br />
                        <a
                            className="About-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="http://www.harmonic-mixing.com/howto.aspx"
                        >
                            Read more >
                        </a>
                    </div>
                </div>
                <div className="About-section-right">
                    <div className="About-scene">
                        <img
                            className={`About-controller-img ${this.visible &&
                                'visible'}`}
                            alt="controller-img"
                            src={Image}
                            ref={this.imgRef}
                        />
                    </div>
                </div>
            </div>
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
