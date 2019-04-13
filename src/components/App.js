import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import './reset.css';
import About from './About';
import Header from './Header';
import Search from './Search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'about'
    }
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

export default connect()(App);
