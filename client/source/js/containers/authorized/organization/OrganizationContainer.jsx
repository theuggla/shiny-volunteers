/*
 * Container-component that wraps the organization-components.
 * Renders different component based on authorization and
 * window location.
 */


// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import { Route, Redirect, Switch, Link } from 'react-router-dom';
import { AuthorizedComponent } from 'react-router-role-authorization';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Auth from '../../../modules/Auth';
import styles from '../../../ReactStyles';

import FrontEndContainer from '../../unauthorized/FrontEndContainer.jsx';
import OrganizationNav from '../../../components/authorized/organization/OrganizationNav.jsx';
import OurNeedsPage from './OurNeedsPage.jsx';
import AddNeedPage from './AddNeedPage.jsx';

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
class OrganizationContainer extends AuthorizedComponent {
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
     * Will render either the Organization-pages or the front end-container.
     * @returns {Component} Different components depending on if the user is authorized.
     */
    render() {
        return this.state.isAuthorized ? (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="organization-app app-container">
                    <div className="app-bar">
                        <p style={styles.topbar.user}>{this.state.user.email}</p>
                        <Link id="main-link" to={`${this.props.match.path}/`}><img src="/assets/logo.png" style={styles.topbar.internalLogo}/></Link>
                        <Link id="logout-link" to={`${this.props.match.path}/logout`} style={styles.topbar.logout}>LOG OUT</Link>
                    </div>
                    <div className="main-space">
                        <Switch>
                            <Route path={`${this.props.match.path}/needs/add`}  render={(props) => (<AddNeedPage {...props} />)}/>
                            <Route path={`${this.props.match.path}/needs`}  render={(props) => (<OurNeedsPage {...props} />)}/>
                            <Route path={`${this.props.match.path}/logout`} render={() => ( Auth.deauthenticateUser() ? (<Redirect to={'/'}/>) : (<Redirect to={`${this.props.match.path}/needs`}/>) )} />
                            <Redirect path={`${this.props.match.path}/`} to={`${this.props.match.path}/needs`}/>
                        </Switch>
                    </div>
                    <OrganizationNav match={this.props.match} history={this.props.history}/>
                </div>
            </MuiThemeProvider>
        ) : ( <FrontEndContainer />);
    }
}

// Exports -----------------------------------------------------------------------------------------------------------
export default OrganizationContainer;
