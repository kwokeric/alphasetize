import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';

class Search extends Component {
  render() {
    return (
      <div className="Search">
        <input className="Search-input" />
      </div>
    );
  }
}

export default connect()(Search);
