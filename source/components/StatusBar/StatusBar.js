
import { Consumer } from 'components/HOC/withProfile';
import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class StatusBar extends Component {
    render () {
        return (
            <section className = { Styles.statusBar }>
                <Consumer>
                    {(context) => {
                        const {
                            avatar,
                            currentUserFirstName,
                            currentUserLastName,
                        } = context;

                        return (
                            <button>
                                <img src = { avatar } />
                                <span>{currentUserFirstName}</span>
                                &nbsp;
                                <span>{currentUserLastName}</span>
                            </button>
                        );
                    }}
                </Consumer>
            </section>
        );
    }
}
