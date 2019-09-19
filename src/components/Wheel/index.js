import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './style.css';
import AuthButton from '../AuthButton';
import controller from './controller.js';
import CamelotWheel from '../../assets/camelotWheel.jpg';

class Wheel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hoverSection: {}
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
        const { hoverSection } = this.state;

        if (
            controller.isMouseInsideCircle({
                mouse: e,
                img: this.imageRef.current
            })
        ) {
            const currSection = controller.getSection({
                mouse: e,
                img: this.imageRef.current
            });

            if (
                hoverSection.hour !== currSection.hour ||
                hoverSection.ring !== currSection.ring
            ) {
                this.setState({
                    hoverSection: currSection
                });
            }
        } else {
            if (hoverSection.hour || hoverSection.ring) {
                this.setState({
                    // hoverSection: {}
                });
            }
        }
    };

    renderSpotifyAuth = () => {
        return (
            <div className="Wheel-auth-section">
                <div className="Wheel-auth-container">
                    <AuthButton />
                </div>
            </div>
        );
    };

    renderWheel = () => {
        const { isMobile } = this.props;
        return (
            <div className="Wheel-image-container">
                <img
                    className="Wheel-image"
                    ref={this.imageRef}
                    src={CamelotWheel}
                    alt="camelotWheel"
                />
                {!isMobile && this.renderWheelCover()}
            </div>
        );
    };

    renderWheelCover = () => {
        const { hoverSection } = this.state;
        const { hour, ring, rotation } = hoverSection;

        if (!hour || !ring) {
            return null;
        }

        const innerStyle = {
            transform: `rotate(${rotation - (ring === 'A' ? 45 : 75)}deg)`
        };
        const outerStyle = {
            transform: `rotate(${rotation - (ring === 'B' ? 45 : 75)}deg)`
        };

        return (
            <Fragment>
                <div className="Wheel-image-eye-cover">hi</div>
                <div className="Wheel-image-inner-cover" style={innerStyle}>
                    <svg className="Wheel-svg-inner" height="210" width="210">
                        <circle
                            cx="105"
                            cy="105"
                            r="75"
                            opacity="0.8"
                            strokeWidth="60.5"
                            strokeDasharray={ring === 'A' ? '353' : '431'}
                        />
                    </svg>
                </div>
                <div className="Wheel-image-outer-cover" style={outerStyle}>
                    <svg className="Wheel-image-outer" height="300" width="300">
                        <circle
                            className="Wheel-svg-outer"
                            cx="150"
                            cy="150"
                            r="127"
                            opacity="0.8"
                            strokeWidth="44"
                            strokeDasharray={ring === 'B' ? '598' : '731'}
                        />
                    </svg>
                </div>
            </Fragment>
        );
    };

    render() {
        const { isMobile } = this.props;

        return (
            <div className="Wheel-image-container">
                <img
                    className="Wheel-image"
                    ref={this.imageRef}
                    src={CamelotWheel}
                    alt="camelotWheel"
                />
                {!isMobile && this.renderWheelCover()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isMobile: state.app.isMobile
    };
};

export default withRouter(connect(mapStateToProps)(Wheel));
