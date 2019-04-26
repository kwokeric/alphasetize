import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import About from './About';
import Header from './Header';
import Search from './Search';

// Misc / Utils
import './App.css';
import './reset.css';

class App extends Component {
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
        const { activeTab } = this.state;

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
