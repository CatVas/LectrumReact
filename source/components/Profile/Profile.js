
import { withProfile } from 'components/HOC/withProfile';
import React, { Component } from 'react';
import Styles from './styles.m.css';

class Profile extends Component {
    render() {
        const {
            avatar,
            currentUserFirstName,
            currentUserLastName,
        } = this.props;

        return (
            <section className = { Styles.profile }>
                <h1>
                    Welcome, {currentUserFirstName} {currentUserLastName}
                </h1>
                <img src = { avatar } />
            </section>
        );
    }
}

export default withProfile(Profile);
