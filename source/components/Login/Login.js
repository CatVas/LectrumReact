
import { withProfile } from 'components/HOC/withProfile';
import React from 'react';
import Styles from './styles.m.css';

const Login = (props) => {
    const _handleButtonClick = () => {
        const { _setAuth } = props;
        _setAuth(true);
    };

    return (
        <div className = { Styles.login }>
            <button
                onClick = { _handleButtonClick }>
                Login
            </button>
        </div>
    );
};

export default withProfile(Login);
