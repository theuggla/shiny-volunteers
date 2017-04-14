import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

const matchesIcon = <FontIcon className="material-icons">matches</FontIcon>;
const applicationsIcon = <FontIcon className="material-icons">applications</FontIcon>;
const profileIcon = <FontIcon className="material-icons">profile</FontIcon>;

class VolunteerNav extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        selectedIndex: 0,
    };

    select = (index) => this.setState({selectedIndex: index});

    render() {
        return (
                <BottomNavigation
                    selectedIndex={this.state.selectedIndex}
                    style={{margin: 0, padding: 0}}
                >
                    <BottomNavigationItem
                        label="matches"
                        icon={matchesIcon}
                        onTouchTap={() =>
                        {
                            this.select(0);
                            this.props.history.push(`${this.props.match.path}/matches`);
                        }}
                    />
                    <BottomNavigationItem
                        label="applications"
                        icon={applicationsIcon}
                        onTouchTap={() =>
                        {
                            this.select(1);
                            this.props.history.push(`${this.props.match.path}/applications`);
                        }}
                    />
                    <BottomNavigationItem
                        label="profile"
                        icon={profileIcon}
                        onTouchTap={() =>
                        {
                            this.select(2);
                            this.props.history.push(`${this.props.match.path}/profile`);
                        }}
                    />
                </BottomNavigation>
        );
    }
}

export default VolunteerNav;
