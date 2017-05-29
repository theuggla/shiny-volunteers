/*
* Container-component that wraps the volunteer-components.
* Renders different component based on authorization and
* window location.
*/


// Imports--------------------------------------------------------------------------------------------------------------
import React from 'react';
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { AuthorizedComponent } from 'react-router-role-authorization';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Auth from '../../../modules/Auth';
import styles from '../../../ReactStyles';

import FrontEndContainer from '../../unauthorized/FrontEndContainer.jsx';
import VolunteerNav from '../../../components/authorized/volunteer/VolunteerNav.jsx';
import MatchPage from './MatchPage.jsx';
import ApplicationsPage from './ApplicationsPage.jsx';
import ProfilePage from './ProfilePage.jsx';

// Config -------------------------------------------------------------------------------------------------------------
const muiTheme = getMuiTheme({
    bottomNavigation: {
        selectedColor: '#F50057',
    },
    menuItem: {
        selectedTextColor: '#0097A7',
    },
    tableRow: {
        selectedColor: 'inherit',
    },

});

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Routes the user and renders different components based on window location.
 * @extends AuthorizedComponent to provide Role-based authorization.
 */
class VolunteerContainer extends AuthorizedComponent {
    /**
     * Constructor gets the user-roles for the currently authorized user.
     * @param props {Object} gets passed on to the super-constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            isAuthorized: true,
            user: {}
        };

        this.userRoles = Auth.getAuthRoles();
        this.notAuthorizedPath = "/";

        this.state.user = Auth.getUserData();
        this.state.isAuthorized = true;
    }

    /**
     * Sets authorized to false.
     * @param routeRoles [String] the authorized roles.
     * @param userRoles [String] the actual roles.
     */
    handleUnauthorizedRole(routeRoles, userRoles) {
        this.setState({isAuthorized: false});
    }

    /**
     * Will render either the Volunteer-pages or the front end-container.
     * @returns {Component} Different components depending on if the user is authorized.
     */
    render() {
        return this.state.isAuthorized ? (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div className="volunteer-app app-container">
                <div className="app-bar">
                    <Link id="main-link" to={`${this.props.match.path}/`}><img src="/assets/logo.png" style={styles.topbar.internalLogo}/></Link>
                    <Link id="logout-link" to={`${this.props.match.path}/logout`} style={styles.topbar.logout}>LOG OUT</Link>
                </div>
                <div className="main-space">
                <Switch>
                    <Route path={`${this.props.match.path}/matches`} render={(props) => (<MatchPage {...props}/>)}/>
                    <Route path={`${this.props.match.path}/applications`}  render={(props) => (<ApplicationsPage {...props}/>)}/>
                    <Route path={`${this.props.match.path}/profile`}  render={(props) => (<ProfilePage {...props}/>)}/>
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


// Exports ------------------------------------------------------------------------------------------------------------
export default VolunteerContainer;
