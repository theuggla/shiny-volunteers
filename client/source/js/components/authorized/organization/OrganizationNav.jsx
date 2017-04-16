import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

const matchesIcon = <FontIcon className="material-icons">needs</FontIcon>;
const applicationsIcon = <FontIcon className="material-icons">add need</FontIcon>;
const profileIcon = <FontIcon className="material-icons">edit need</FontIcon>;

class OrganizationNav extends Component {
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
                className ="organization-nav"
                selectedIndex={this.state.selectedIndex}
                style={{margin: 0, padding: 0}}
            >
                <BottomNavigationItem
                    label="needs"
                    icon={matchesIcon}
                    onTouchTap={() =>
                    {
                        this.select(0);
                        this.props.history.push(`${this.props.match.path}/needs`);
                    }}
                />
                <BottomNavigationItem
                    label="add need"
                    icon={applicationsIcon}
                    onTouchTap={() =>
                    {
                        this.select(1);
                        this.props.history.push(`${this.props.match.path}/needs/add`);
                    }}
                />
                <BottomNavigationItem
                    label="edit need"
                    icon={profileIcon}
                    onTouchTap={() =>
                    {
                        this.select(2);
                        this.props.history.push(`${this.props.match.path}/needs/edit`);
                    }}
                />
            </BottomNavigation>
        );
    }
}

export default OrganizationNav;
