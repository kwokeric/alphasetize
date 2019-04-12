import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default connect()(App);
