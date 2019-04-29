import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Actions
import SpotifyActions from '../redux/actions/SpotifyActions';

// Components
import Header from './Header';

// Misc / Utils
import './AppTemplate.css';
import '../css/reset.css';
import urlUtils from '../utils/urlUtils.js';

class AppTemplate extends Component {
    componentDidMount() {
        const { token, dispatch } = this.props;

        if (token) {
            return;
        }

        const urlParams = urlUtils.getUrlParams();

        if (urlParams.access_token) {
            console.log('> Setting Spotify access token');
            dispatch(SpotifyActions.setToken(urlParams.access_token));
        }
    }

    render() {
        const { pathname, children } = this.props;
        return (
            <div className="AppTemplate">
                <Header pathname={pathname} />
                {children}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        pathname: ownProps.location.pathname,
        token: state.spotify.token
    };
};

export default withRouter(connect(mapStateToProps)(AppTemplate));
