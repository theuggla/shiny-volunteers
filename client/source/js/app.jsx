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


const muiTheme = getMuiTheme(darkBaseTheme, {
    snackbar: {
        textColor: 'white',
        backgroundColor: '#212121',
        actionColor: '#C51162'
    }
});

const App = () => (
    <HashRouter >
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <Switch>
                        <Route path="/volunteer" render={(props) => ( Auth.isUserAuthenticated() ? (<VolunteerContainer {...props} routes={[{authorize: ['volunteer']}]}/>) : (<FrontEndContainer />) )} />
                        <Route path="/organization" render={(props) => ( Auth.isUserAuthenticated() ? (<OrganizationContainer {...props} routes={[{authorize: ['organization']}]}/>) : (<FrontEndContainer />))} />
                        <Route path="/" render={() => ( Auth.isUserAuthenticated() ? (<Redirect to={Auth.getAuthRoles()[0]}/>) : (<FrontEndContainer />))} />
                    </Switch>
                </div>
            </MuiThemeProvider>
    </HashRouter>
);


ReactDOM.render(<App />, document.getElementById('container'));
