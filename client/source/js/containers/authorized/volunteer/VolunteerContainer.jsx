import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthorizedComponent } from 'react-router-role-authorization';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import auth from '../../../modules/Auth';

import VolunteerNav from '../../../components/authorized/VolunteerNav.jsx';
import MatchPage from './MatchPage.jsx';
import ApplicationsPage from './ApplicationsPage.jsx';
import ProfilePage from './ProfilePage.jsx';

class VolunteerContainer extends AuthorizedComponent {
    constructor(props) {
        super(props);

        this.userRoles = auth.getAuthRoles();
        this.notAuthorizedPath = "/"
    }

    handleUnauthorizedRole(routeRoles, userRoles) {
        // handle unsuccessful authorization somehow
        console.log(`Route is available for roles: ${routeRoles}, but your roles are: ${userRoles}...`);

        this.props.history.push('/');
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div className="volunteer-app app-container">
                <Switch>
                <Redirect exact path={`${this.props.match.path}/`} to={`${this.props.match.path}/matches`}/>
                <Route path={`${this.props.match.path}/matches`}  component={MatchPage}/>
                <Route path={`${this.props.match.path}/applications`}  component={ApplicationsPage}/>
                <Route path={`${this.props.match.path}/profile`}  component={ProfilePage}/>
                </Switch>
                <VolunteerNav match={this.props.match} history={this.props.history}/>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default VolunteerContainer;
