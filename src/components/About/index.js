import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';

class About extends Component {
  render() {
    return (
      <div className="About">
        <h1 className="About-header">
            Your sets in harmony
        </h1>
        <h2 className="About-subheader">
            Alphasetize helps you organize your sets to keep things sounding smooth
        </h2>
      </div>
    );
  }
}

export default connect()(About);
