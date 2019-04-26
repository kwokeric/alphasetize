import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Components
import Header from './Header';

// Misc / Utils
import './AppTemplate.css';
import './reset.css';

class AppTemplate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'about'
        };
    }

    componentDidMount() {
        // nothing here
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
