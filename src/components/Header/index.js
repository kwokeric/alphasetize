import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import cx from '../../utils/cx.js';

class Header extends Component {
    handleClick = route => {};

    render() {
        const { pathname } = this.props;

        return (
            <div className="Header">
                <div className="Header-logo">Alphasetize</div>
                <div className="Header-tabs">
                    <div
                        className={cx('Header-tab', {
                            'Header-tab-active':
                                pathname === '/' || pathname === '/about'
                        })}
                    >
                        <Link to={'/'}>ABOUT</Link>
                    </div>
                    <div
                        className={cx('Header-tab', {
                            'Header-tab-active': pathname === '/search'
                        })}
                    >
                        <Link to={'/search'}>SEARCH</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
