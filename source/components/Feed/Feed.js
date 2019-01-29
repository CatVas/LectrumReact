import { Composer, Post, Spinner, StatusBar } from 'components';
import { delay, getUniqueID } from 'instruments';
import moment from 'moment';
import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class Feed extends Component {
    constructor () {
        super();
        this._createPost = this._createPost.bind(this);
        this._likePost = this._likePost.bind(this);
        this._setPostFetchingState = this._setPostFetchingState.bind(this);
    }

    state = {
        isPending: false,
        posts:     [
            {
                comment: 'How are you?',
                created: 1526825076849,
                id:      '123',
                likes:   [],
            },
            {
                comment: 'What\'s up?',
                created: 1526825079999,
                id:      '456',
                likes:   [],
            },
        ],
    };

    async _createPost (comment) {
        const post = {
            comment,
            created: moment().utc()
                .unix(),
            id:    getUniqueID(),
            likes: [],
        };

        this._setPostFetchingState(true);
        await delay(1200);
        this.setState(({ posts }) => ({
            isPending: false,
            posts:     [ post, ...posts ],
        }));
    }

    async _likePost (id) {
        const { currentUserFirstName, currentUserLastName } = this.props;
        const { posts } = this.state;

        this._setPostFetchingState(true);
        await delay(1200);

        const newPosts = posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            firstName: currentUserFirstName,
                            id:        getUniqueID(),
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            isPending: false,
            posts:     newPosts,
        });
    }

    _setPostFetchingState (isPending) {
        this.setState({ isPending });
    }

    render() {
        const { isPending, posts } = this.state;

        const postsJSX = posts.map((post) => (
            <Post
                _likePost = { this._likePost }
                key = { post.id }
                { ...post }
            />
        ));

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPending } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
