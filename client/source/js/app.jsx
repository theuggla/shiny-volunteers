import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
injectTapEventPlugin();


import FrontEndContainer from './containers/unauthorized/FrontEndContainer.jsx';
import VolunteerContainer from './containers/authorized/volunteer/VolunteerContainer.jsx';
import OrganizationContainer from './containers/authorized/organization/OrganizationContainer.jsx';
import '../css/style.css';


const App = () => (
    <BrowserRouter >
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Switch>
                    <Route path="/volunteer" render={(props) => (<VolunteerContainer {...props} routes={[{authorize: ['volunteer']}]}/>)} />
                    <Route path="/organization" render={(props) => (<OrganizationContainer {...props} routes={[{authorize: ['organization']}]}/>)} />
                    <Route path="/" component={FrontEndContainer} />
                </Switch>
            </MuiThemeProvider>
    </BrowserRouter>
);


ReactDOM.render(<App />, document.getElementById('container'));
