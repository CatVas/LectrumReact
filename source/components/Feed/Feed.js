import { Composer, Post } from 'components';
import React, { Component } from 'react';

export default class Feed extends Component {
    render() {
        return (
            <section>
                <Composer />
                <Post />
            </section>
        );
    }
}
