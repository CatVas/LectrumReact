
import cn from 'classnames';
import { Like } from 'components';
import { withProfile } from 'components/HOC/withProfile';
import moment from 'moment';
import { array, bool, func, number, string } from 'prop-types';
import React, { Component } from 'react';
import Styles from './styles.m.css';

class Post extends Component {
    static propTypes = {
        comment:     string.isRequired,
        created:     number.isRequired,
        id:          string.isRequired,
        likes:       array.isRequired,
        pending:     bool,
        _removePost: func.isRequired,
        _likePost:   func.isRequired,
    };

    _handlePostRemove = () => {
        const { _removePost, id, pending } = this.props;

        if (!pending) {
            _removePost(id);
        }
    }

    render () {
        const {
            avatar,
            comment,
            created,
            currentUserFirstName,
            currentUserLastName,
            id,
            likes,
            pending,
            _likePost,
        } = this.props;

        return (
            <section className = { cn(Styles.post, {
                [ Styles.pending ]: pending,
            }) }>
                <span
                    className = { Styles.cross }
                    onClick = { this._handlePostRemove }
                />
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
                />
            </section>
        );
    }
}

export default withProfile(Post);
