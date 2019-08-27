import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './style.css';
import CamelotWheel from '../../assets/camelotWheel.jpg';
import cx from '../../utils/cx.js';
import urlUtils from '../../utils/urlUtils.js';

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

    handleSpotifyAuth = e => {
        e.preventDefault();
        const { token, history } = this.props;
        const client_id = 'b722de12baaf4052a82f8cd762edda76';
        const urlParams = urlUtils.getUrlParams();

        if (!urlParams.access_token && !token) {
            window.location.href =
                'https://accounts.spotify.com/authorize?' +
                'client_id=' +
                client_id +
                '&scope=' +
                encodeURIComponent('playlist-modify-public') +
                '&response_type=token&redirect_uri=http://localhost:3000/search';
        } else {
            console.log('> Already authenticated!');
            history.push('/search');
        }
    };

    renderSpotifyAuth = () => {
        const { token } = this.props;
        const { authHover } = this.state;

        return (
            <div className="About-auth-section">
                <div className="About-auth-container">
                    <div
                        className={cx('About-auth-button', {
                            'About-auth-button-hover': authHover
                        })}
                        onMouseOver={this.handleMouseOver}
                        onMouseLeave={this.handleMouseLeave}
                        onClick={this.handleSpotifyAuth}
                    >
                        {!authHover
                            ? 'Get started'
                            : token
                                ? 'SEARCH'
                                : 'SPOTIFY LOGIN'}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="About">
                <div className="About-content">
                    <h1 className="About-header">Your sets in harmony</h1>
                    <h2 className="About-subheader">
                        Alphasetize helps you order songs in your sets based on
                        key compatibility.
                    </h2>
                    {this.renderSpotifyAuth()}
                    <div className="About-section">
                        <div className="About-image-container">
                            <img
                                className="About-image"
                                src={CamelotWheel}
                                alt="camelotWheel"
                            />
                        </div>
                        <div>
                            Have you ever noticed the uncomfortable dissonance
                            when mixing two songs witch clashing pitches? Use
                            Alphasetize to know which songs are compatible and
                            open up a world of creativity!
                            <br />
                            <br />
                            Using this wheel (akin to a clock) as a reference,
                            you can move to an adjacent key within each ring
                            (the next "hour"), or to a section in the adjacent
                            ring (in the same "hour").
                            <br />
                            <br />
                            To read more about how it works, check out{' '}
                            <a
                                className="About-link"
                                href="https://mixedinkey.com/harmonic-mixing-guide/"
                            >
                                this
                            </a>{' '}
                            great article
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        token: state.user.token
    };
};

export default withRouter(connect(mapStateToProps)(About));
