import { Catcher, Feed } from 'components';
import { Provider } from 'components/HOC/withProfile';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import avatar from 'theme/assets/lisa';

const options = {
    avatar,
    currentUserFirstName: 'Василий',
    currentUserLastName:  'Самусиев',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Catcher>
                <Provider value = { options }>
                    <Feed />
                </Provider>
            </Catcher>
        );
    }
}
