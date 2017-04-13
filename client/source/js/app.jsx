import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Route } from 'react-router-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import WelcomePage from './components/unauthorized/WelcomePage.jsx';
import LoginPage from './containers/unauthorized/LoginPage.jsx';
import VolunteerContainer from './components/authorized/volunteer/VolunteerContainer.jsx';
import VolunteerMatchPage from './components/authorized/volunteer/VolunteerMatchPage.jsx';
import '../css/style.css';


const HelloWorld = () => (
    <BrowserRouter >
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <div>
                        <Route exact path="/" component={WelcomePage}/>
                        <Route path="/login" component={LoginPage}/>
                        <Route render={(props) => <VolunteerMatchPage {...props} authorize={['volunteer']} />} path="/volunteer" />
                    </div>
            </MuiThemeProvider>
    </BrowserRouter>
);


ReactDOM.render(<HelloWorld />, document.getElementById('container'));
