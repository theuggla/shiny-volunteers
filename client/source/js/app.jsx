/**
 * Starting point of the application.
 * Redirects the user to logged in screen if authenticated.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
injectTapEventPlugin();

import Auth from './modules/Auth';

import FrontEndContainer from './containers/unauthorized/FrontEndContainer.jsx';
import VolunteerContainer from './containers/authorized/volunteer/VolunteerContainer.jsx';
import OrganizationContainer from './containers/authorized/organization/OrganizationContainer.jsx';
import '../css/style.css';

const App = () => (
    <HashRouter >
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div>
                    <Switch>
                        <Route path="/volunteer" render={(props) => (<VolunteerContainer {...props} routes={[{authorize: ['volunteer']}]}/>)} />
                        <Route path="/organization" render={(props) => (<OrganizationContainer {...props} routes={[{authorize: ['organization']}]}/>)} />
                        <Route path="/" render={() => ( Auth.isUserAuthenticated() ? (<Redirect to={Auth.getAuthRoles()[0]}/>) : (<FrontEndContainer />))} />
                    </Switch>
                </div>
            </MuiThemeProvider>
    </HashRouter>
);


ReactDOM.render(<App />, document.getElementById('container'));
