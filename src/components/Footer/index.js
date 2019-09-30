import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const Footer = () => {
    const d = new Date();
    const year = d.getFullYear();

    return (
        <div className="Footer">
            <div className="Footer-section">
                <div className="Footer-left">{`© ${year} Alphasetize`}</div>
                <div className="Footer-right">
                    Thanks to:
                    <div className="Footer-thanks">
                        <Link to={'https://spotify.com/'}>Spotify</Link>
                    </div>
                    <div className="Footer-thanks">
                        <Link to={'https://mixedinkey.com/'}>Mixed In Key</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
