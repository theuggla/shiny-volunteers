import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { AuthorizedComponent } from 'react-router-role-authorization';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Auth from '../../../modules/Auth';

import FrontEndContainer from '../../unauthorized/FrontEndContainer.jsx';
import VolunteerNav from '../../../components/authorized/volunteer/VolunteerNav.jsx';
import MatchPage from './MatchPage.jsx';
import ApplicationsPage from './ApplicationsPage.jsx';
import ProfilePage from './ProfilePage.jsx';

const muiTheme = getMuiTheme({
    bottomNavigation: {
        selectedColor: '#F50057',
    },
});

class VolunteerContainer extends AuthorizedComponent {
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
            <div className="volunteer-app app-container">
                <div className="app-bar">
                    <Link id="logout-link" to={`${this.props.match.path}/logout`}><img src="/assets/logo.png" style={{maxHeight: '10vh'}}/></Link>
                </div>
                <div className="main-space">
                <Switch>
                    <Route path={`${this.props.match.path}/matches`} render={(props) => (<MatchPage {...props}/>)}/>
                    <Route path={`${this.props.match.path}/applications`}  render={(props) => (<ApplicationsPage {...props}/>)}/>
                    <Route path={`${this.props.match.path}/profile`}  component={ProfilePage}/>
                    <Route path={`${this.props.match.path}/logout`} render={() => ( Auth.deauthenticateUser() ? (<Redirect to={'/'}/>) : (<Redirect to={`${this.props.match.path}/matches`}/>) )} />
                    <Redirect path={`${this.props.match.path}/`} to={`${this.props.match.path}/matches`}/>
                </Switch>
                </div>
                <VolunteerNav match={this.props.match} history={this.props.history}/>
            </div>
            </MuiThemeProvider>
            ) : ( <FrontEndContainer />);
    }
}

export default VolunteerContainer;
