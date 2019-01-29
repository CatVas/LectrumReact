
import { Consumer } from 'components/HOC/withProfile';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Styles from './styles.m.css';

export default class Composer extends Component {
    static propTypes = {
        _createPost: PropTypes.func.isRequired,
    };

    constructor () {
        super();

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._submitComment = this._submitComment.bind(this);
        this._submitOnEnter = this._submitOnEnter.bind(this);
        this._updateComment = this._updateComment.bind(this);
    }

    state = {
        comment: '',
    };

    _handleFormSubmit (event) {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment () {
        const { _createPost } = this.props;
        const { comment } = this.state;

        if (!comment) {
            return null;
        }
        _createPost(comment);
        this.setState({ comment: '' });
    }

    _submitOnEnter (event) {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._submitComment();
        }
    }

    _updateComment (event) {
        this.setState({ comment: event.target.value });
    }

    render() {
        const { comment } = this.state;

        return (
            <Consumer>
                {({ avatar, currentUserFirstName }) => (
                    <section className = { Styles.composer }>
                        <img src = { avatar } />
                        <form onSubmit = { this._handleFormSubmit }>
                            <textarea
                                placeholder = { `What do u think, ${currentUserFirstName}?` }
                                value = { comment }
                                onChange = { this._updateComment }
                                onKeyPress = { this._submitOnEnter }
                            />
                            <input
                                type = 'submit'
                                value = 'Post'
                            />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
