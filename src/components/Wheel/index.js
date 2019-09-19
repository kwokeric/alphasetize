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
                    hoverSection: {}
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
        console.log(hoverSection);

        return (
            <Fragment>
                <div className="Wheel-image-inner-cover" />
                <div className="Wheel-image-outer-cover" />
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
