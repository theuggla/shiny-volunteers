import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { AuthorizedComponent } from 'react-router-role-authorization';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import auth from '../../../modules/Auth';

import OrganizationNav from '../../../components/authorized/OrganizationNav.jsx';
import OurNeedsPage from './OurNeedsPage.jsx';
import AddNeedPage from './AddNeedPage.jsx';
import EditNeedPage from './EditNeedPage.jsx';


class OrganizationContainer extends AuthorizedComponent {
    constructor(props) {
        super(props);

        this.userRoles = auth.getAuthRoles();
        this.notAuthorizedPath = "/"
    }

    handleUnauthorizedRole(routeRoles, userRoles) {
        this.props.history.push('/');
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className="organization-app app-container">
                    <Redirect exact path={`${this.props.match.path}/`} to={`${this.props.match.path}/needs`}/>
                    <Switch>
                    <Route path={`${this.props.match.path}/needs/add`}  component={AddNeedPage}/>
                    <Route path={`${this.props.match.path}/needs/edit`}  component={EditNeedPage}/>
                    <Route path={`${this.props.match.path}/needs`}  component={OurNeedsPage}/>
                    </Switch>
                    <OrganizationNav match={this.props.match} history={this.props.history}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default OrganizationContainer;
