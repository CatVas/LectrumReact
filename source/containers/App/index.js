import {
    Catcher, Feed, Profile, StatusBar,
} from 'components';
import { Provider } from 'components/HOC/withProfile';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';
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
                    <StatusBar />
                    <Switch>
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
