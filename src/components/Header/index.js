import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cx from '../../utils/cx.js';
import './style.css';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.pathname.split('/').join(''),
            underlinePosX: 0,
            underlineWidth: 200
        };

        this.aboutRef = React.createRef();
        this.createRef = React.createRef();
        this.contactRef = React.createRef();
    }

    componentDidMount() {
        const activeTab = this.getActiveTab();

        // todo use webpack to make css load before js
        setTimeout(() => {
            this.setState({
                underlineWidth: activeTab.offsetWidth,
                underlinePosX: activeTab.offsetLeft
            });
        }, 10);
    }

    componentDidUpdate(prevProps) {
        const { pathname } = this.props;

        if (pathname !== prevProps.pathname) {
            const activeTab = this.getActiveTab();

            this.setState({
                underlineWidth: activeTab.offsetWidth,
                underlinePosX: activeTab.offsetLeft,
                underlineColor: '#000'
            });
        }
    }

    getActiveTab = () => {
        const { pathname } = this.props;

        let activeTab = document.getElementById('tab-home');
        try {
            activeTab = this[pathname.split('/').join('').toLowerCase() + 'Ref']
                .current;
        } catch (error) {
            // default to home
        }

        return activeTab;
    };

    handleMouseEnter = tab => {
        const { pathname } = this.props;
        if (pathname.split('/').join('') === tab) {
            return;
        }
        const hoveredTab = this[tab + 'Ref'].current;

        this.setState({
            underlineColor: '#2799aa',
            underlineWidth: hoveredTab.offsetWidth,
            underlinePosX: hoveredTab.offsetLeft
        });
    };

    handleMouseLeave = () => {
        const activeTab = this.getActiveTab();

        this.setState({
            underlineColor: '#000000',
            underlineWidth: activeTab.offsetWidth,
            underlinePosX: activeTab.offsetLeft
        });
    };

    render() {
        const { pathname } = this.props;
        const { underlineColor, underlineWidth, underlinePosX } = this.state;

        const underlineStyles = {
            backgroundColor: underlineColor,
            width: underlineWidth - 32,
            left: underlinePosX + 16
        };

        return (
            <div className="Header">
                <div className="Header-cont">
                    <div className="Header-logo">Alphasetize</div>
                    <div className="Header-tabs">
                        <div
                            className="Header-underline"
                            style={underlineStyles}
                        />
                        <div
                            id="tab-home"
                            className={cx('Header-tab', {
                                'Header-tab-active':
                                    pathname === '/about' || pathname === '/'
                            })}
                            ref={this.aboutRef}
                            onMouseEnter={() => this.handleMouseEnter('about')}
                            onMouseLeave={() => this.handleMouseLeave('about')}
                        >
                            <Link to={'/'}>ABOUT</Link>
                        </div>
                        <div
                            id="tab-create"
                            className={cx('Header-tab', {
                                'Header-tab-active': pathname === '/create'
                            })}
                            ref={this.createRef}
                            onMouseEnter={() => this.handleMouseEnter('create')}
                            onMouseLeave={() => this.handleMouseLeave('create')}
                        >
                            <Link to={'/create'}>CREATE</Link>
                        </div>
                        <div
                            id="tab-contact"
                            className={cx('Header-tab', {
                                'Header-tab-active': pathname === '/contact'
                            })}
                            ref={this.contactRef}
                            onMouseEnter={() =>
                                this.handleMouseEnter('contact')
                            }
                            onMouseLeave={() =>
                                this.handleMouseLeave('contact')
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
