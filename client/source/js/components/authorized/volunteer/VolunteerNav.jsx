import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';

const matchesIcon = <FontIcon className="material-icons"><img src="/assets/icons/matches-icon-grey.png" style={{maxHeight: '70%'}}/></FontIcon>;
const matchesIconActive = <FontIcon className="material-icons"><img src="/assets/icons/matches-icon-red.png" style={{maxHeight: '70%'}}/></FontIcon>;
const applicationsIcon = <FontIcon className="material-icons"><img src="/assets/icons/applications-icon-grey.png" style={{maxHeight: '70%'}}/></FontIcon>;
const applicationsIconActive = <FontIcon className="material-icons"><img src="/assets/icons/applications-icon-red.png" style={{maxHeight: '70%'}}/></FontIcon>;
const profileIcon = <FontIcon className="material-icons"><img src="/assets/icons/profile-icon-grey.png" style={{maxHeight: '70%'}}/></FontIcon>;
const profileIconActive = <FontIcon className="material-icons"><img src="/assets/icons/profile-icon-red.png" style={{maxHeight: '70%'}}/></FontIcon>;

let style = {
    height: '12vh',
    maxHeight: '12vh',
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    paddingBottom: '3vh',
    zIndex: '10'
};

class VolunteerNav extends Component {
    componentWillReceiveProps(nextProps) {
            switch (nextProps.history.location.pathname) {
                case '/volunteer/matches':
                    this.select(0);
                    break;
                case '/volunteer/applications':
                    this.select(1);
                    break;
                case 'volunteer/profile':
                    this.select(2);
                    break;
            }
    }

    constructor(props) {
        super(props);
    }

    state = {
        selectedIndex: 0,
        matchesIcon: matchesIconActive,
        applicationsIcon: applicationsIcon,
        profileIcon: profileIcon
    };

    select = (index) => {
        let match = (index === 0) ? matchesIconActive : matchesIcon;
        let applications = (index === 1) ? applicationsIconActive : applicationsIcon;
        let profile = (index === 2) ? profileIconActive : profileIcon;


        this.setState({
            selectedIndex: index,
            matchesIcon: match,
            applicationsIcon: applications,
            profileIcon: profile
        });
    };

    render() {
        return (
                <BottomNavigation
                    className="volunteer-nav"
                    selectedIndex={this.state.selectedIndex}
                    style={style}
                >
                    <BottomNavigationItem
                        label="matches"
                        icon={this.state.matchesIcon}
                        onTouchTap={() =>
                        {
                            this.select(0);
                            this.props.history.push(`${this.props.match.path}/matches`);
                        }}
                    />
                    <BottomNavigationItem
                        label="applications"
                        icon={this.state.applicationsIcon}
                        onTouchTap={() =>
                        {
                            this.select(1);
                            this.props.history.push(`${this.props.match.path}/applications`);
                        }}
                    />
                    <BottomNavigationItem
                        label="profile"
                        icon={this.state.profileIcon}
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
