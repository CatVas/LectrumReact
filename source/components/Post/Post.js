
import { Consumer } from 'components/HOC/withProfile';
import moment from 'moment';
import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class Post extends Component {
    render() {
        return (
            <Consumer>
                {(context) => {
                    const {
                        avatar,
                        currentUserFirstName,
                        currentUserLastName,
                    } = context;

                    return (
                        <section className = { Styles.post }>
                            <img src = { avatar } />
                            <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                            <time>{moment().format('MMMM D h:mm:ss a')}</time>
                            <p>Post content</p>
                        </section>
                    );
                }}
            </Consumer>
        );
    }
}
