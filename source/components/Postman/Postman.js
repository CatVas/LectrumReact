
import { withProfile } from 'components/HOC/withProfile';
import React from 'react';
import Styles from './styles.m.css';

const Postman = ({
    avatar,
    currentUserFirstName,
}) => {
    return (
        <section className = { Styles.postman }>
            <img src = { avatar } />
            <span>
                Welcome online, {currentUserFirstName}
            </span>
        </section>
    );
};

export default withProfile(Postman);
