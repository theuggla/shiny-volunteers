/**
 * A navigation component to visually
 * keep track of the user's navigation.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React, {Component} from 'react';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

import styles from '../../../ReactStyles';

// Variables ----------------------------------------------------------------------------------------------------------
const matchesIcon = <FontIcon><img src="/assets/icons/matches-icon-grey.png" style={styles.navigation.navIcon}/></FontIcon>;
const matchesIconActive = <FontIcon><img src="/assets/icons/matches-icon-red.png" style={styles.navigation.navIcon}/></FontIcon>;
const applicationsIcon = <FontIcon><img src="/assets/icons/applications-icon-grey.png" style={styles.navigation.navIcon}/></FontIcon>;
const applicationsIconActive = <FontIcon><img src="/assets/icons/applications-icon-red.png" style={styles.navigation.navIcon}/></FontIcon>;
const profileIcon = <FontIcon><img src="/assets/icons/profile-icon-grey.png" style={styles.navigation.navIcon}/></FontIcon>;
const profileIconActive = <FontIcon><img src="/assets/icons/profile-icon-red.png" style={styles.navigation.navIcon}/></FontIcon>;

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Visually keeps track of the volunteer-navigation and pushes new locations to the history object.
 */
class VolunteerNav extends Component {
    /**
     * Passes on props and sets initial state.
     * @param props {Object} will be passed on.
     */
    constructor(props) {
        super(props);
        this.state = this.select(props.history.location);
    }

    /**
     * Updates the selected navigation-item
     * based on the new window location.
     * @param nextProps {Object} the props the component is about to receive.
     */
    componentWillReceiveProps(nextProps) {
        this.updateNav(this.select(nextProps.history.location));
    }

    /**
     * Changes state depending on the window location.
     * @param location {Object} the location-object to base the change on.
     */
    select(location) {
        let index;
        let state;

        switch (location.pathname) {
            case '/volunteer/matches':
                index = 0;
                break;
            case '/volunteer/applications':
                index = 1;
                break;
            case '/volunteer/profile':
                index = 2;
                break;
        }

        let match = (index === 0) ? matchesIconActive : matchesIcon;
        let applications = (index === 1) ? applicationsIconActive : applicationsIcon;
        let profile = (index === 2) ? profileIconActive : profileIcon;

        state = {
            selectedIndex: index,
            matchesIcon: match,
            applicationsIcon: applications,
            profileIcon: profile
        };

        return state;
    }

    /**
     * Update the navigation's state.
     * @param state {Object} the new state to set.
     */
    updateNav(state) {
        this.setState(state);
    }

    /**
     * @returns {Conponent} A BottomNavigationComponent with three BottomNavigationItems
     * that reacts to location change.
     */
    render() {
        return (
                <BottomNavigation
                    className="volunteer-nav"
                    selectedIndex={this.state.selectedIndex}
                    style={styles.navigation.navigationStyle}
                >
                    <BottomNavigationItem
                        label="matches"
                        icon={this.state.matchesIcon}
                        onTouchTap={() =>
                        {
                            this.props.history.push(`${this.props.match.path}/matches`);
                        }}
                    />
                    <BottomNavigationItem
                        label="applications"
                        icon={this.state.applicationsIcon}
                        onTouchTap={() =>
                        {
                            this.props.history.push(`${this.props.match.path}/applications`);
                        }}
                    />
                    <BottomNavigationItem
                        label="profile"
                        icon={this.state.profileIcon}
                        onTouchTap={() =>
                        {
                            this.props.history.push(`${this.props.match.path}/profile`);
                        }}
                    />
                </BottomNavigation>
        );
    }
}

// Exports ------------------------------------------------------------------------------------------------------------
export default VolunteerNav;
