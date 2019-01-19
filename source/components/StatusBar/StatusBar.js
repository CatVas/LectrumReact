
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class StatusBar extends Component {
    static propTypes = {
        avatar:               PropTypes.string,
        currentUserFirstName: PropTypes.string,
        currentUserLastName:  PropTypes.string,
    };

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
