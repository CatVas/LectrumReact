
import { Like } from 'components';
import { Consumer } from 'components/HOC/withProfile';
import moment from 'moment';
import { array, func, number, string } from 'prop-types';
import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        comment:   string.isRequired,
        created:   number.isRequired,
        id:        string.isRequired,
        likes:     array.isRequired,
        _likePost: func.isRequired,
    };

    render() {
        const { comment, created, id, likes, _likePost } = this.props;

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
                            <span className = { Styles.cross } />
                            <img src = { avatar } />
                            <a>{`${currentUserFirstName} ${currentUserLastName}`}</a>
                            <time>
                                {moment.unix(created).format('MMMM D h:mm:ss a')}
                            </time>
                            <p>
                                {comment}
                            </p>
                            <Like
                                _likePost = { _likePost }
                                id = { id }
                                likes = { likes }
                                { ...context }
                            />
                        </section>
                    );
                }}
            </Consumer>
        );
    }
}
