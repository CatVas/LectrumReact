
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

    _getCross = () => {
        const {
            currentUserFirstName,
            currentUserLastName,
            firstName,
            lastName,
        } = this.props;

        return `${currentUserFirstName}${currentUserLastName}` === `${firstName}${lastName}`
            ? (
                <span
                    className = { Styles.cross }
                    onClick = { this._handlePostRemove }
                />
            ) : null;
    }

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
            firstName,
            id,
            lastName,
            likes,
            pending,
            _likePost,
        } = this.props;
        const crossJSX = this._getCross();

        return (
            <section className = { cn(Styles.post, {
                [ Styles.pending ]: pending,
            }) }>
                {crossJSX}
                <img src = { avatar } />
                <a>{`${firstName} ${lastName}`}</a>
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
