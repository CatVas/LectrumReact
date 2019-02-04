
import { withProfile } from 'components/HOC/withProfile';
import React, { Component } from 'react';
import Styles from './styles.m.css';

class StatusBar extends Component {
    render () {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.statusBar }>
                <button>
                    <img src = { avatar } />
                    <span>{currentUserFirstName}</span>
                    &nbsp;
                    <span>{currentUserLastName}</span>
                </button>
            </section>
        );
    }
}

export default withProfile(StatusBar);
