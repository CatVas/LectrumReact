
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import Styles from './styles.m.css';

const portal = document.getElementById('spinner');

class Spinner extends PureComponent {
    static propTypes = {
        isSpinning: PropTypes.bool,
    };

    static defaultProps = {
        isSpinning: false,
    };

    render () {
        const { isSpinning } = this.props;

        return createPortal(
            isSpinning ? <div className = { Styles.spinner } /> : null,
            portal,
        );
    }
}

export default Spinner;
