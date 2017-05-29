/**
 * Starting point of the application.
 * Redirects the user to logged in screen if authenticated,
 * or renders the unauthenticated container component if not.
 * Renders the app into the HTML.
 * */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Auth from './modules/Auth';
import '../css/style.css';

import FrontEndContainer from './containers/unauthorized/FrontEndContainer.jsx';
import VolunteerContainer from './containers/authorized/volunteer/VolunteerContainer.jsx';
import OrganizationContainer from './containers/authorized/organization/OrganizationContainer.jsx';

// Config -------------------------------------------------------------------------------------------------------------
injectTapEventPlugin();


const muiTheme = getMuiTheme(darkBaseTheme, {
    snackbar: {
        textColor: 'white',
        backgroundColor: '#212121',
        actionColor: '#C51162'
    }
});

// Class --------------------------------------------------------------------------------------------------------------
const App = () => (
    <HashRouter >
            <MuiThemeProvider muiTheme={muiTheme}>
                <ScrollToTop>
                <div>
                    <Switch>
                        <Route path="/volunteer" render={(props) => ( Auth.isUserAuthenticated() ? (<VolunteerContainer {...props} routes={[{authorize: ['volunteer']}]}/>) : (<FrontEndContainer />) )} />
                        <Route path="/organization" render={(props) => ( Auth.isUserAuthenticated() ? (<OrganizationContainer {...props} routes={[{authorize: ['organization']}]}/>) : (<FrontEndContainer />))} />
                        <Route path="/" render={() => ( Auth.isUserAuthenticated() ? (<Redirect to={Auth.getAuthRoles()[0]}/>) : (<FrontEndContainer />))} />
                    </Switch>
                </div>
                </ScrollToTop>
            </MuiThemeProvider>
    </HashRouter>
);

// Render -------------------------------------------------------------------------------------------------------------
ReactDOM.render(<App />, document.getElementById('container'));
