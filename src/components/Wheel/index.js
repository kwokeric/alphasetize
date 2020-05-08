import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './style.css';
import controller from './controller.js';
import CamelotWheel from '../../assets/camelotWheel.jpg';
import IconTap from '../../assets/icon-tap.svg';

class Wheel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasTapped: false,
            hoverSection: {},
            touchX: null,
            touchY: null
        };

        this.imageRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('touchend', this.handleMouseDown);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('touchend', this.handleMouseDown);
    }

    handleMouseMove = e => {
        const { hasTapped, hoverSection } = this.state;

        if (
            controller.isMouseInsideCircle({
                mouse: e,
                img: this.imageRef.current
            })
        ) {
            if (!hasTapped) {
                this.setState({
                    hasTapped: true
                });
            }

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

        const wheelDiameter =
            this.imageRef.current && this.imageRef.current.width;
        const eyeDiameter = wheelDiameter * (95 / 300);

        const innerWheelDiameter = wheelDiameter * (210 / 300);
        const innerStrokeWidth = wheelDiameter * (60 / 300);
        const innerDashArrayA = wheelDiameter * (353 / 300);
        const innerDashArrayB = wheelDiameter * (432 / 300);

        const outerWheelDiameter = wheelDiameter;
        const outerStrokeWidth = (wheelDiameter - innerWheelDiameter) / 2;
        const outerDashArrayA = wheelDiameter * (599 / 300);
        const outerDashArrayB = wheelDiameter * (733 / 300);

        return (
            <Fragment>
                <div className="Wheel-cover" style={innerStyle}>
                    <svg
                        className="Wheel-svg-inner"
                        height={innerWheelDiameter}
                        width={innerWheelDiameter}
                    >
                        <circle
                            cx={innerWheelDiameter / 2}
                            cy={innerWheelDiameter / 2}
                            r={
                                (innerWheelDiameter / 2 + eyeDiameter / 2) / 2 -
                                2
                            }
                            opacity="0.8"
                            strokeWidth={innerStrokeWidth}
                            strokeDasharray={
                                ring === 'A' ? innerDashArrayA : innerDashArrayB
                            }
                        />
                    </svg>
                </div>
                <div className="Wheel-cover" style={outerStyle}>
                    <svg
                        className="Wheel-image-outer"
                        height={outerWheelDiameter}
                        width={outerWheelDiameter}
                    >
                        <circle
                            cx={outerWheelDiameter / 2}
                            cy={outerWheelDiameter / 2}
                            r={
                                (outerWheelDiameter / 2 +
                                    innerWheelDiameter / 2) /
                                2
                            }
                            opacity="0.8"
                            strokeWidth={outerStrokeWidth}
                            strokeDasharray={
                                ring === 'B' ? outerDashArrayA : outerDashArrayB
                            }
                        />
                    </svg>
                </div>
            </Fragment>
        );
    };

    render() {
        const { hasTapped } = this.state;

        return (
            <div className="Wheel-image-container">
                <img
                    className="Wheel-image"
                    ref={this.imageRef}
                    src={CamelotWheel}
                    alt="camelotWheel"
                />
                {!hasTapped && (
                    <img
                        className="Wheel-icon-tap"
                        src={IconTap}
                        alt="icon-tap"
                    />
                )}
                {this.renderWheelCover()}
            </div>
        );
    }
}

export default withRouter(connect()(Wheel));
