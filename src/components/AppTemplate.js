import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Actions
import UserActions from '../redux/actions/UserActions';

// Components
import Header from './Header';

// Misc / Utils
import './AppTemplate.css';
import '../css/reset.css';
import '../css/utils.css';
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
            dispatch(UserActions.setToken(urlParams.access_token));
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
        token: state.user.token
    };
};

export default withRouter(connect(mapStateToProps)(AppTemplate));
