
import { number } from 'prop-types';
import React from 'react';
import Styles from './styles.m.css';

const Counter = ({ count }) => (
    <section className = { Styles.counter }>
        Posts count: {count}
    </section>
);

Counter.defaultProps = {
    count: 0,
};
Counter.propTypes = {
    count: number,
};

export default Counter;
