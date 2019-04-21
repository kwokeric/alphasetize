import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './App.css';
import './reset.css';
import About from './About';
import Header from './Header';
import Search from './Search';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'search'
        };

        console.log('constructor');
        // this.getToken();
    }

    componentDidMount() {
        const { token } = this.props;
        const client_id = 'b722de12baaf4052a82f8cd762edda76';
        const client_secret = '70e8080cde704e87af4a0b1f70d4a345';

        console.log('componentDidMount');
        if (!token) {
            console.log('no token');
            window.location.href =
                'https://accounts.spotify.com/authorize?' +
                'client_id=' +
                client_id +
                '&scope=token&redirect_uri=http://localhost:3000/callback';
        } else {
            this.props.setToken(hashParams.access_token);
        }
    }

    getToken = () => {
        const client_id = 'b722de12baaf4052a82f8cd762edda76';
        const client_secret = '70e8080cde704e87af4a0b1f70d4a345';

        let requestOptions = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                Authorization:
                    'Basic ' +
                    new Buffer(client_id + ':' + client_secret).toString(
                        'base64'
                    ),
                'Access-Control-Allow-Origin': '*'
            },
            form: { grant_type: 'client_credentials' },
            json: true
        };

        console.log(requestOptions);

        return axios(requestOptions).then(res => {
            console.log(res);
            console.log(res.data);
        });
    };

    render() {
        const { activeTab } = this.state;

        console.log('render');

        return (
            <div className="App">
                <Header />
                {activeTab === 'about' && <About />}
                {activeTab === 'search' && <Search />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token
});

export default connect(mapStateToProps)(App);
