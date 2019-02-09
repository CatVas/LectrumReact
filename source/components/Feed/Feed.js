import { Catcher, Composer, Post, Postman, Spinner, StatusBar } from 'components';
import { withProfile } from 'components/HOC/withProfile';
import { api, GROUP_ID, TOKEN } from 'config/api';
import { fromTo } from 'gsap';
import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { socket } from 'socket/init';
import Styles from './styles.m.css';

class Feed extends Component {
    state = {
        isPending:     false,
        pendingPostId: null,
        posts:         [],
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPosts();
        socket.emit('join', GROUP_ID);
        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);
            const { authorFirstName, authorLastName } = meta;
            if (
                `${currentUserFirstName}${currentUserLastName}`
                !== `${authorFirstName}${authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: [ createdPost, ...posts ],
                }));
            }
        });
        socket.on('like', (likedJSON) => {
            const { data: likedPost, meta } = JSON.parse(likedJSON);
            const { authorFirstName, authorLastName } = meta;
            if (
                `${currentUserFirstName}${currentUserLastName}`
                !== `${authorFirstName}${authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.map(
                        (post) => post.id === likedPost.id ? likedPost : post,
                    ),
                }));
            }
        });
        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);
            const { authorFirstName, authorLastName } = meta;
            if (
                `${currentUserFirstName}${currentUserLastName}`
                !== `${authorFirstName}${authorLastName}`
            ) {
                this.setState(({ posts }) => ({
                    posts: posts.filter((post) => post.id !== removedPost.id),
                }));
            }
        });
    }

    componentWillUnmount() {
        socket.removeListener('create');
        socket.removeListener('like');
        socket.removeListener('remove');
    }

    _animateComposeEnter = (composerDOM) => {
        fromTo(
            composerDOM,
            4,
            {
                opacity:   0,
                rotationX: 50,
            },
            {
                opacity:    1,
                rotationX:  0,
                onComplete: () => { console.log('Animation is done'); },
            },
        );
    }

    _createPost = async (comment) => {
        this._setPostFetchingState(true);
        const response = await fetch(api, {
            body:    JSON.stringify({ comment }),
            headers: {
                Authorization:  TOKEN,
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const { data: post } = await response.json();
        this.setState(({ posts }) => ({
            isPending: false,
            posts:     [ post, ...posts ],
        }));
    }

    _fetchPosts = async () => {
        this._setPostFetchingState(true);
        const response = await fetch(api, {
            method: 'GET',
        });
        const { data: posts } = await response.json();

        this.setState({
            isPending: false,
            posts,
        });
    }

    _likePost = async (id) => {
        this._setPostFetchingState(true);
        const response = await fetch(`${api}/${id}`, {
            headers: {
                Authorization: TOKEN,
            },
            method: 'PUT',
        });
        const { data: likedPost } = await response.json();
        this.setState(({ posts }) => ({
            isPending: false,
            posts:     posts.map(
                (post) => post.id === likedPost.id ? likedPost : post,
            ),
        }));
    }

    _removePost = async (id) => {
        this._setPendingPost(id);
        this._setPostFetchingState(true);
        await fetch(`${api}/${id}`, {
            headers: {
                Authorization: TOKEN,
            },
            method: 'DELETE',
        });
        this.setState(({ posts }) => ({
            isPending:     false,
            pendingPostId: null,
            posts:         posts.filter((p) => p.id !== id),
        }));
    }

    _setPendingPost = (pendingPostId) => {
        this.setState({ pendingPostId });
    }

    _setPostFetchingState = (isPending) => {
        this.setState({ isPending });
    }

    render() {
        const { isPending, pendingPostId, posts } = this.state;

        const postsJSX = posts.map(({ id, ...post }) => (
            <Catcher key = { id }>
                <Post
                    _likePost = { this._likePost }
                    _removePost = { this._removePost }
                    id = { id }
                    pending = { id === pendingPostId }
                    { ...post }
                />
            </Catcher>
        ));

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPending } />
                <StatusBar />
                <Transition
                    appear
                    in
                    timeout = { 4000 }
                    onEnter = { this._animateComposeEnter }>
                    <Composer _createPost = { this._createPost } />
                </Transition>
                {postsJSX}
                <Postman />
            </section>
        );
    }
}

export default withProfile(Feed);
