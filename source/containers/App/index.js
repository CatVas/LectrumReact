import {
    Catcher, Feed, Login, Profile, StatusBar,
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
const _lsAuthName = 'lectrumReactAuthenticated';

@hot(module)
export default class App extends Component {
    state = {
        authenticated: JSON.parse(localStorage.getItem(_lsAuthName)),
    };

    _authenticated = (routeComponent) => {
        const { authenticated } = this.state;

        return authenticated
            ? routeComponent
            : (
                <Redirect to = '/login' />
            );
    };

    _setAuth = (authenticated) => {
        this.setState({ authenticated });
        localStorage.setItem(_lsAuthName, JSON.stringify(!!authenticated));
    };

    render() {
        const toContext = {
            ...options,
            ...this.state,
            _setAuth: this._setAuth,
        };

        return (
            <Catcher>
                <Provider value = { toContext }>
                    <StatusBar />
                    <Switch>
                        <Route
                            component = { Login }
                            path = '/login'
                        />
                        {this._authenticated(
                            <Route
                                component = { Feed }
                                path = '/feed'
                            />,
                        )}
                        {this._authenticated(
                            <Route
                                component = { Profile }
                                path = '/profile'
                            />,
                        )}
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}
