import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Actions
import AppActions from '../redux/actions/AppActions';
import UserActions from '../redux/actions/UserActions';

// Components
import Header from './Header';

// Misc / Utils
import './AppTemplate.css';
import '../css/reset.css';
import '../css/utils.css';
import cx from '../utils/cx.js';
import appUtils from '../utils/appUtils.js';
import urlUtils from '../utils/urlUtils.js';

class AppTemplate extends Component {
    constructor(props) {
        super(props);

        props.dispatch(
            AppActions.setAppStoreBool('isMobile', appUtils.isMobile())
        );
    }

    componentDidMount() {
        const { token, dispatch } = this.props;

        if (token) {
            return;
        }

        const urlParams = urlUtils.getUrlParams();

        if (urlParams.access_token) {
            console.log('> Setting Spotify access token');
            dispatch(UserActions.setToken(urlParams.access_token));
            dispatch(UserActions.getUser());
        }
    }

    render() {
        const { pathname, children, isMobile } = this.props;
        return (
            <div
                className={cx('AppTemplate', {
                    'AppTemplate-m': isMobile
                })}
            >
                {!(isMobile && pathname !== '/') && (
                    <Header pathname={pathname} />
                )}
                {children}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isMobile: state.app.isMobile,
        pathname: ownProps.location.pathname,
        token: state.user.token
    };
};

export default withRouter(connect(mapStateToProps)(AppTemplate));
