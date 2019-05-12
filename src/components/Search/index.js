import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style.css';
import Autocomplete from '../Autocomplete';
import List from '../List';

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
        const { list } = this.props;

        return (
            <div className="Search">
                <div className="Search-autocomplete">
                    <Autocomplete />
                </div>
                <div className="Search-import">IMPORT</div>
                <List list={list} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.tracks.list,
        token: state.user.token
    };
};

export default connect(mapStateToProps)(Search);
