import { Composer, Post, Spinner, StatusBar } from 'components';
import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            {
                comment: 'How are you?',
                created: 1526825076849,
                id:      '123',
            },
            {
                comment: 'What\'s up?',
                created: 1526825079999,
                id:      '456',
            },
        ],
    };

    render() {
        const { posts } = this.state;

        const postsJSX = posts.map((post) => (
            <Post
                key = { post.id }
                { ...post }
            />
        ));

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning />
                <StatusBar />
                <Composer />
                {postsJSX}
            </section>
        );
    }
}
