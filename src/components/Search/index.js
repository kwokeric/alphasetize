import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';
import Autocomplete from '../Autocomplete';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        // create Input ref and set to active
    }

    render() {
        // add results here

        return (
            <div className="Search">
                <Autocomplete />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.spotify.token
    };
};

export default connect(mapStateToProps)(Search);
