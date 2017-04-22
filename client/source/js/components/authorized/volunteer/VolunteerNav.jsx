import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

const matchesIcon = <img src="/assets/logo.png" />;
const applicationsIcon = <FontIcon className="material-icons">app</FontIcon>;
const profileIcon = <FontIcon className="material-icons">profile</FontIcon>;

let style = {
    maxHeight: '50%'
};

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
                    className="volunteer-nav"
                    selectedIndex={this.state.selectedIndex}
                    style={{margin: 0, padding: 0}}
                >
                    <BottomNavigationItem
                        style={style}
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
