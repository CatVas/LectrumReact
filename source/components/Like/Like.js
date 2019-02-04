
import cn from 'classnames';
import { withProfile } from 'components/HOC/withProfile';
import { arrayOf, func, shape, string } from 'prop-types';
import React, { PureComponent } from 'react';
import Styles from './styles.m.css';

class Like extends PureComponent {
    static propTypes = {
        id:    string.isRequired,
        likes: arrayOf(shape({
            firstName: string.isRequired,
            id:        string.isRequired,
            lastName:  string.isRequired,
        })).isRequired,
        _likePost: func.isRequired,
    };

    state = {
        showLikers: false,
    };

    _getLikedByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({ firstName, lastName }) => {
            return (
                `${firstName} ${lastName}`
                === `${currentUserFirstName} ${currentUserLastName}`
            );
        });
    }

    _getLikersList = () => {
        const { likes } = this.props;
        const { showLikers } = this.state;
        const likesJSX = likes.map(({ firstName, id, lastName }) => (
            <li key = { id }>
                {`${firstName} ${lastName}`}
            </li>
        ));

        return likes.length && showLikers ? (
            <ul>
                {likesJSX}
            </ul>
        ) : null;
    }

    _getLikesDescription = () => {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;
        const likedByMe = this._getLikedByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return `You and ${likes.length - 1} other`;
        } else if (likedByMe) {
            return `You and ${likes.length - 1} others`;
        }

        return likes.length;
    }

    _getLikeStyles = () => {
        const likedByMe = this._getLikedByMe();

        return cn(Styles.icon, {
            [ Styles.liked ]: likedByMe,
        });
    }

    _hideLikers = () => {
        this.setState({ showLikers: false });
    }

    _likePost = () => {
        const { _likePost, id } = this.props;
        _likePost(id);
    }

    _showLikers = () => {
        this.setState({ showLikers: true });
    }

    render () {
        const likersList = this._getLikersList();
        const likesDescription = this._getLikesDescription();
        const likeStyles = this._getLikeStyles();

        return (
            <section className = { Styles.like }>
                <span
                    className = { likeStyles }
                    onClick = { this._likePost }>
                    Like
                </span>
                <div>
                    {likersList}
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        {likesDescription}
                    </span>
                </div>
            </section>
        );
    }
}

export default withProfile(Like);
