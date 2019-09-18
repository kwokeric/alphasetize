import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

// Actions
import AppActions from '../redux/actions/AppActions';
import UserActions from '../redux/actions/UserActions';

// Components
import AuthButton from './AuthButton';
import Header from './Header';
import Modal from './Modal';

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
            console.log('Setting Spotify access token...');
            dispatch(UserActions.setToken(urlParams.access_token));
            dispatch(UserActions.getUser());
        }
    }

    render() {
        const { pathname, children, isMobile, showAuthModal } = this.props;
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
                {showAuthModal && (
                    <Modal
                        onHideModal={this.handleHideModal}
                        background={false}
                    >
                        <div className="AppTemplate-auth-modal">
                            <div className="AppTemplate-auth-header">
                                Please reauthorize Alphasetize
                            </div>
                            <div className="AppTemplate-auth-btn">
                                <AuthButton />
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isMobile:
            typeof state.app.isMobile !== 'undefined'
                ? state.app.isMobile
                : true,
        pathname: ownProps.location.pathname,
        showAuthModal: state.app.showAuthModal,
        token: state.user.token
    };
};

export default withRouter(connect(mapStateToProps)(AppTemplate));
