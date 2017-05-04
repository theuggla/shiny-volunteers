import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { AuthorizedComponent } from 'react-router-role-authorization';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Auth from '../../../modules/Auth';

import FrontEndContainer from '../../unauthorized/FrontEndContainer.jsx';
import OrganizationNav from '../../../components/authorized/organization/OrganizationNav.jsx';
import OurNeedsPage from './OurNeedsPage.jsx';
import AddNeedPage from './AddNeedPage.jsx';

const muiTheme = getMuiTheme({
    bottomNavigation: {
        selectedColor: '#F50057',
    },
});


class OrganizationContainer extends AuthorizedComponent {
    state = {
        openPopup: false,
        popupMessage: ''
    };

    constructor(props) {
        super(props);

        this.userRoles = Auth.getAuthRoles();
        this.isAuthorized = true;
        this.notAuthorizedPath = "/"
    }

    handleUnauthorizedRole(routeRoles, userRoles) {
        this.isAuthorized = false;
    }

    render() {
        return this.isAuthorized ? (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="organization-app app-container">
                    <div className="app-bar">
                        <Link id="main-link" to={`${this.props.match.path}/`}><img src="/assets/logo.png" style={{maxHeight: '10vh'}}/></Link>
                        <Link id="logout-link" to={`${this.props.match.path}/logout`}>/>LOG OUT</Link>
                    </div>
                    <div className="main-space">
                        <Switch>
                            <Route path={`${this.props.match.path}/needs/add`}  component={AddNeedPage}/>
                            <Route path={`${this.props.match.path}/needs`}  component={OurNeedsPage}/>
                            <Route path={`${this.props.match.path}/logout`} render={() => ( Auth.deauthenticateUser() ? (<Redirect to={'/'}/>) : (<Redirect to={`${this.props.match.path}/needs`}/>) )} />
                            <Redirect path={`${this.props.match.path}/`} to={`${this.props.match.path}/needs`}/>
                        </Switch>
                        <Snackbar
                            open={this.state.openPopup}
                            message={this.state.popupMessage}
                        />
                    </div>
                    <OrganizationNav match={this.props.match} history={this.props.history}/>
                </div>
            </MuiThemeProvider>
        ) : ( <FrontEndContainer />);
    }
}

export default OrganizationContainer;
