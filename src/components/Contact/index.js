import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import './style.css';
import IconChat from '../../assets/icon-chat.svg';
import IconCode from '../../assets/icon-code.svg';
import IconMusic from '../../assets/icon-music.svg';

class Contact extends Component {
    render() {
        return (
            <div className="Contact">
                <div className="Contact-content">
                    <div className="Contact-top">
                        <div className="Contact-title-section">
                            <h1 className="Contact-header">Contact</h1>
                            <h2 className="Contact-header-2">
                                Alphasetize was created by Eric Kwok
                            </h2>
                        </div>
                    </div>
                    <div className="Contact-section">
                        <div className="Contact-description">
                            <div className="Contact-description-tile">
                                <div className="Contact-description-top">
                                    <img
                                        className="Contact-icon"
                                        src={IconChat}
                                        alt="icon-chat"
                                    />
                                    <div className="Contact-subheader">
                                        Reach out
                                    </div>
                                </div>
                                <div className="Contact-link">
                                    <a
                                        className="link"
                                        href="mailto: erickwokdev@gmail.com"
                                    >
                                        Email
                                    </a>
                                </div>
                                <br />
                                <div className="Contact-link">
                                    <a
                                        className="link"
                                        href="https://www.linkedin.com/in/eric-kwok/"
                                    >
                                        Linked In
                                    </a>
                                </div>

                                <br />
                            </div>
                            <div className="Contact-description-tile">
                                <div className="Contact-description-top">
                                    <img
                                        className="Contact-icon"
                                        src={IconMusic}
                                        alt="icon-bulb"
                                    />
                                    <div className="Contact-subheader">
                                        Music
                                    </div>
                                </div>
                                <div className="Contact-link">
                                    <a
                                        className="link"
                                        href="https://soundcloud.com/eks-official"
                                    >
                                        SoundCloud
                                    </a>
                                </div>
                                <br />
                                <div className="Contact-link">
                                    <a
                                        className="link"
                                        href="https://open.spotify.com/user/xtz2r9shizlr37boi82pz14nt?si=vu8A27sYRhq_vukW0q19BQ"
                                    >
                                        Spotify
                                    </a>
                                </div>
                            </div>
                            <div className="Contact-description-tile">
                                <div className="Contact-description-top">
                                    <img
                                        className="Contact-icon"
                                        src={IconCode}
                                        alt="icon-code"
                                    />
                                    <div className="Contact-subheader">
                                        Engineering
                                    </div>
                                </div>
                                <div className="Contact-link">
                                    <a
                                        className="link"
                                        href="https://github.com/kwokeric"
                                    >
                                        GitHub
                                    </a>
                                </div>
                                <br />
                                <div className="Contact-link">
                                    <a
                                        className="link"
                                        href="https://erickwok.io/"
                                    >
                                        erickwok.io
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isMobile: state.app.isMobile
    };
};

export default withRouter(connect(mapStateToProps)(Contact));
