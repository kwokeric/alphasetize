import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

class Header extends Component {
    render() {
        const { pathname } = this.props;

        return (
            <div className="Header">
                <div className="Header-cont">
                    <div className="Header-logo">Alphasetize</div>
                    <div className="Header-tabs">
                        <div
                            className={
                                pathname === '/about' || pathname === '/'
                                    ? 'Header-tab-active'
                                    : 'Header-tab'
                            }
                        >
                            <Link to={'/'}>ABOUT</Link>
                        </div>
                        <div
                            className={
                                pathname === '/create'
                                    ? 'Header-tab-active'
                                    : 'Header-tab'
                            }
                        >
                            <Link to={'/create'}>CREATE</Link>
                        </div>
                        <div
                            className={
                                pathname === '/contact'
                                    ? 'Header-tab-active'
                                    : 'Header-tab'
                            }
                        >
                            <Link to={'/contact'}>CONTACT</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
