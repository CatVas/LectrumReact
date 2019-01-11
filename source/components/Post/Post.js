import moment from 'moment';
import React, { Component } from 'react';
import avatar from 'theme/assets/lisa';

export default class Post extends Component {
    render() {
        return (
            <section>
                <img src = { avatar } />
                <a>Lisa Simpson</a>
                <time>{moment().format('MMMM D h:mm:ss a')}</time>
                <p>Post content</p>
            </section>
        );
    }
}
