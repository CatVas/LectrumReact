
import cn from 'classnames';
import { withProfile } from 'components/HOC/withProfile';
import { fromTo } from 'gsap';
import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { socket } from 'socket/init';
import Styles from './styles.m.css';

class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });
        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    _animateStatusBarEnter = (element) => {
        fromTo(element, 4, {
            opacity: 0,
        }, {
            opacity: 1,
        });
    }

    _handleLogoutClick = () => {
        const { _setAuth } = this.props;
        _setAuth(false);
    };

    render () {
        const {
            authenticated,
            avatar,
            currentUserFirstName,
        } = this.props;
        const { online } = this.state;
        const statusMessage = online ? 'Online' : 'Offline';
        const statusStyle = cn(Styles.status, {
            [ Styles.offline ]: !online,
            [ Styles.online ]:  online,
        });

        return (
            <Transition
                appear
                in
                timeout = { 4000 }
                onEnter = { this._animateStatusBarEnter }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle }>
                        <div>
                            { statusMessage }
                        </div>
                        <span />
                    </div>
                    {authenticated && (
                        <Fragment>
                            <Link to = '/profile'>
                                <img src = { avatar } />
                                <span>{ currentUserFirstName }</span>
                            </Link>
                            <Link to = '/feed'>
                                Feed
                            </Link>
                            <button
                                className = { Styles.logout }
                                onClick = { this._handleLogoutClick }>
                                Logout
                            </button>
                        </Fragment>
                    )}
                </section>
            </Transition>
        );
    }
}

export default withProfile(StatusBar);
