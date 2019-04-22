import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';
import CamelotWheel from '../../assets/camelotWheel.jpg';
import cx from '../../utils/cx.js';

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authHover: false
        };
    }

    handleMouseOver = index => {
        this.setState({
            authHover: true
        });
    };

    handleMouseLeave = () => {
        this.setState({
            authHover: false
        });
    };

    renderSpotifyAuth = () => {
        const { authHover } = this.state;

        return (
            <div className="About-auth-section">
                <div
                    className="About-auth-container"
                    onMouseOver={this.handleMouseOver}
                    onMouseLeave={this.handleMouseLeave}
                >
                    <div
                        className={cx('About-auth-button', {
                            'About-auth-button-hover': authHover
                        })}
                    >
                        {authHover ? 'SPOTIFY LOGIN' : 'Get started'}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const { token } = this.props;
        return (
            <div className="About">
                <div className="About-content">
                    <h1 className="About-header">Your sets in harmony</h1>
                    <h2 className="About-subheader">
                        Alphasetize helps you order songs in your sets based on
                        key compatibility.
                    </h2>
                    {!token && this.renderSpotifyAuth()}
                    <div className="About-section">
                        <div className="About-image-container">
                            <img
                                className="About-image"
                                src={CamelotWheel}
                                alt="camelotWheel"
                            />
                        </div>
                        <div>
                            Harmonic mixing consists of two elements: knowing
                            the key of every song that you play and knowing
                            which keys are compatible. Mark Davis created the
                            Camelot wheel, a visual, color-coded system to help
                            djs figure out which keys are compatible.
                            <br />
                            <br />
                            Each key is assigned a code number from one to
                            twelve, like the hours around a clock. If you play a
                            song in 5A and mix it into a song with a 10A key
                            code, for example, you’ll notice the difference
                            immediately. The clashing pitch between the two
                            songs creates an uncomfortable dissonance To get
                            started, find the keys of your songs.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.spotify.token
    };
};

export default connect(mapStateToProps)(About);
