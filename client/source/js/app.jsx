import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import WelcomePage from './components/WelcomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import '../css/style.css';


const HelloWorld = () => (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Router>
                    <div>
                        <Route exact path="/" component={WelcomePage}/>
                        <Route path="/login" component={LoginPage}/>
                    </div>
                </Router>
            </MuiThemeProvider>
        );


ReactDOM.render(<HelloWorld />, document.getElementById('container'));
