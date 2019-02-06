
import { object } from 'prop-types';
import React, { PureComponent } from 'react';
import Styles from './styles.m.css';

export default class Catcher extends PureComponent {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        error: false,
    };

    componentDidCatch (error, stack) {
        console.log('ERROR', error);
        console.log('STACKTRACE', stack.componentStack);

        this.setState({ error: true });
    }

    render () {
        if (this.state.error) {
            return (
                <section className = { Styles.catcher }>
                    <span>
                        An error happened
                    </span>
                </section>
            );
        }

        return this.props.children;
    }
}
