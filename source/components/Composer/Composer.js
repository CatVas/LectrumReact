import React, { Component } from 'react';
import avatar from 'theme/assets/lisa';

export default class Composer extends Component {
    render() {
        return (
            <section>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { 'What do u think?' } />
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}
