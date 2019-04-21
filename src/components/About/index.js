import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';

class About extends Component {
    render() {
        /*<div className="About-text">
            Harmonic mixing consists of two elements: knowing the key of
            every song that you play and knowing which keys are
            compatible. Mark Davis created the Camelot wheel, a visual,
            color-coded system to help djs figure out which keys are
            compatible. Each key is assigned a code number from one to
            twelve, like the hours around a clock. If you play a song in
            5A and mix it into a song with a 10A key code, for example,
            you’ll notice the difference immediately. The clashing pitch
            between the two songs creates an uncomfortable dissonance To
            get started, find the keys of your songs.
        </div>*/
        return (
            <div className="About">
                <h1 className="About-header">Your sets in harmony</h1>
                <h2 className="About-subheader">
                    Alphasetize helps you order songs in your sets based on key
                    compatibility.
                </h2>
            </div>
        );
    }
}

export default connect()(About);
