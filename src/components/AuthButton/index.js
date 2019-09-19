import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './style.css';
import cx from '../../utils/cx.js';
import appUtils from '../../utils/appUtils.js';
import urlUtils from '../../utils/urlUtils.js';

class AuthButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authHover: false
        };
    }

    handleMouseOver = () => {
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
        const urlParams = urlUtils.getUrlParams();

        if (!urlParams.access_token && !token) {
            window.location.href = appUtils.getSpotifyAuthUrl();
        } else {
            console.log('> Already authenticated!');
            history.push('/search');
        }
    };

    render() {
        const { token } = this.props;
        const { authHover } = this.state;

        return (
            <div
                className={cx('AuthButton-button', {
                    'AuthButton-button-hover': authHover
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
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.user.token
    };
};

export default withRouter(connect(mapStateToProps)(AuthButton));
