/**
 * A navigation component to visually
 * keep track of the user's navigation.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React, {Component} from 'react';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import styles from '../../../ReactStyles';

// Variables ----------------------------------------------------------------------------------------------------------
const needsIcon = <FontIcon className="material-icons"><img src="/assets/icons/matches-icon-grey.png" style={styles.navIcon}/></FontIcon>;
const needsIconActive = <FontIcon className="material-icons"><img src="/assets/icons/matches-icon-red.png" style={styles.navIcon}/></FontIcon>;
const addNeedIcon = <FontIcon className="material-icons"><img src="/assets/icons/add-need-icon-grey.png" style={styles.navIcon}/></FontIcon>;
const addNeedIconActive = <FontIcon className="material-icons"><img src="/assets/icons/add-need-icon-red.png" style={styles.navIcon}/></FontIcon>;

/**
 * Visually keeps track of the organization-navigation and pushes new locations to the history object.
 */
class OrganizationNav extends Component {
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
            case '/organization/needs':
                index = 0;
                break;
            case '/organization/needs/add':
                index = 1;
                break;
        }

        let needs = (index === 0) ? needsIconActive : needsIcon;
        let addNeed = (index === 1) ? addNeedIconActive : addNeedIcon;

        state = {
            selectedIndex: index,
            needsIcon: needs,
            addNeedIcon: addNeed
        };

        return state;
    };

    /**
     * Update the navigation's state.
     * @param state {Object} the new state to set.
     */
    updateNav(state) {
        this.setState(state);
    }

    /**
     * @returns {Conponent} A BottomNavigationComponent with two BottomNavigationItems
     * that reacts to location change.
     */
    render() {
        return (
            <BottomNavigation
                className ="organization-nav"
                selectedIndex={this.state.selectedIndex}
                style={styles.navigationStyle}
            >
                <BottomNavigationItem
                    label="needs"
                    icon={this.state.needsIcon}
                    onTouchTap={() =>
                    {
                        this.props.history.push(`${this.props.match.path}/needs`);
                    }}
                />
                <BottomNavigationItem
                    label="add need"
                    icon={this.state.addNeedIcon}
                    onTouchTap={() =>
                    {
                        this.props.history.push(`${this.props.match.path}/needs/add`);
                    }}
                />
            </BottomNavigation>
        );
    }
}

// Exports ------------------------------------------------------------------------------------------------------------
export default OrganizationNav;
