import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import { AuthorizedComponent } from 'react-router-role-authorization';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Auth from '../../../modules/Auth';

import OrganizationNav from '../../../components/authorized/organization/OrganizationNav.jsx';
import OurNeedsPage from './OurNeedsPage.jsx';
import AddNeedPage from './AddNeedPage.jsx';
import EditNeedPage from './EditNeedPage.jsx';

const muiTheme = getMuiTheme({
    bottomNavigation: {
        selectedColor: '#F50057',
    },
});


class OrganizationContainer extends AuthorizedComponent {
    constructor(props) {
        super(props);

        this.userRoles = Auth.getAuthRoles();
        this.notAuthorizedPath = "/"
    }

    handleUnauthorizedRole(routeRoles, userRoles) {
        this.props.history.push('/');
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="organization-app app-container">
                    <div className="app-bar">
                        <Link id="logout-link" to={`${this.props.match.path}/logout`}><img src="/assets/logo.png" style={{maxHeight: '10vh'}}/></Link>
                    </div>
                    <div className="main-space">
                     <Switch>
                            <Route path={`${this.props.match.path}/needs/add`}  component={AddNeedPage}/>
                            <Route path={`${this.props.match.path}/needs/edit`}  component={EditNeedPage}/>
                            <Route path={`${this.props.match.path}/needs`}  component={OurNeedsPage}/>
                            <Route path={`${this.props.match.path}/logout`} render={() => ( Auth.deauthenticateUser() ? (<Redirect to={'/'}/>) : (<Redirect to={`${this.props.match.path}/needs`}/>) )} />
                            <Redirect exact path={`${this.props.match.path}/`} to={`${this.props.match.path}/needs`}/>
                     </Switch>
                    </div>
                    <OrganizationNav match={this.props.match} history={this.props.history}/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default OrganizationContainer;
