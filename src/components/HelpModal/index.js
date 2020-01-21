import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';

const HelpModal = ({ onHideModal }) => {
    return (
        <div className="HelpModal">
            <h1 className="HelpModal-header">HOW THIS WORKS</h1>
            <div className="HelpModal-subheader">
                This <span className="HelpModal-tab">Create</span> window is for
                organizing your set.
            </div>
            <ul className="HelpModal-details">
                <li>Import a song by searching in the search field</li>
                <li>Import an existing playlist of yours</li>
            </ul>
            <div className="HelpModal-subheader">What do the colors mean?</div>
            <ul className="HelpModal-details">
                <li>Each song's key and is mapped to a key code</li>
                <li className="HelpModal-point">
                    Clicking on a song will highlight other harmonically
                    compatible songs
                    <ul className="HelpModal-details-colors">
                        <li>
                            <span className="HelpModal-blue">Blue:</span>{' '}
                            Identical key
                        </li>
                        <li>
                            <span className="HelpModal-green">Green:</span>{' '}
                            Different key - same scale
                        </li>
                        <li>
                            <span className="HelpModal-yellow">Yellow:</span>{' '}
                            Same key - parallel scale
                        </li>
                        <li>
                            <span className="HelpModal-gray">None:</span>{' '}
                            Incompatible key
                        </li>
                    </ul>
                </li>
                <li>
                    Read more on{' '}
                    <span className="HelpModal-tab-link">
                        <Link to={'/about'}>About</Link>
                    </span>{' '}
                    page for details
                </li>
            </ul>
            <div className="HelpModal-btn" onClick={onHideModal}>
                GOT IT
            </div>
        </div>
    );
};

export default connect()(HelpModal);
