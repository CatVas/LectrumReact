
import cn from 'classnames';
import { withProfile } from 'components/HOC/withProfile';
import React, { Component } from 'react';
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

    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;
        const { online } = this.state;
        const statusMessage = online ? 'Online' : 'Offline';
        const statusStyle = cn(Styles.status, {
            [ Styles.offline ]: !online,
            [ Styles.online ]:  online,
        });

        return (
            <section className = { Styles.statusBar }>
                <div className = { statusStyle }>
                    <div>
                        { statusMessage }
                    </div>
                    <span />
                </div>
                <button>
                    <img src = { avatar } />
                    <span>{ currentUserFirstName }</span>
                    &nbsp;
                    <span>{ currentUserLastName }</span>
                </button>
            </section>
        );
    }
}

export default withProfile(StatusBar);
