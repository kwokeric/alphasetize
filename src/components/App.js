import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import SpotifyActions from '../redux/actions/SpotifyActions';

// Components
import About from './About';
import Header from './Header';
import Search from './Search';

// Misc / Utils
import './App.css';
import './reset.css';
import controller from './controller.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'search'
        };
    }

    componentDidMount() {
        const { token, dispatch } = this.props;
        const client_id = 'b722de12baaf4052a82f8cd762edda76';
        const urlParams = controller.getUrlParams();
        console.log('token:', token);

        if (!urlParams.access_token && !token) {
            window.location.href =
                'https://accounts.spotify.com/authorize?' +
                'client_id=' +
                client_id +
                '&response_type=token&redirect_uri=http://localhost:3000/callback';
        } else {
            dispatch(SpotifyActions.setToken(urlParams.access_token));
        }
    }

    render() {
        const { activeTab } = this.state;
        const { token } = this.props;

        return (
            <div className="App">
                <Header />
                {activeTab === 'about' && <About />}
                {activeTab === 'search' && <Search />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.spotify.token
    };
};

export default connect(mapStateToProps)(App);
