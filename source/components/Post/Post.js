
import { Consumer } from 'components/HOC/withProfile';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        comment: PropTypes.string.isRequired,
        created: PropTypes.number.isRequired,
    };

    render() {
        const { comment, created } = this.props;

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
                            <time>
                                {moment.unix(created).format('MMMM D h:mm:ss a')}
                            </time>
                            <p>
                                {comment}
                            </p>
                        </section>
                    );
                }}
            </Consumer>
        );
    }
}
