import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class Composer extends Component {
    render() {
        const {
            avatar,
            currentUserFirstName,
        } = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What do u think, ${currentUserFirstName}?` } />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}
