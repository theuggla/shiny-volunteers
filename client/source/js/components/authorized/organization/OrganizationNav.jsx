import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

const needsIcon = <FontIcon className="material-icons"><img src="/assets/icons/matches-icon-grey.png" style={{maxHeight: '70%'}}/></FontIcon>;
const needsIconActive = <FontIcon className="material-icons"><img src="/assets/icons/matches-icon-red.png" style={{maxHeight: '70%'}}/></FontIcon>;
const addNeedIcon = <FontIcon className="material-icons"><img src="/assets/icons/add-need-icon-grey.png" style={{maxHeight: '70%'}}/></FontIcon>;
const addNeedIconActive = <FontIcon className="material-icons"><img src="/assets/icons/add-need-icon-red.png" style={{maxHeight: '70%'}}/></FontIcon>;

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

class OrganizationNav extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        selectedIndex: 0,
        needsIcon: needsIconActive,
        addNeedIcon: addNeedIcon,
    };

    select = (index) => {
        let needs = (index === 0) ? needsIconActive : needsIcon;
        let addNeed = (index === 1) ? addNeedIconActive : addNeedIcon;


        this.setState({
            selectedIndex: index,
            needsIcon: needs,
            addNeedIcon: addNeed
        });
    };


    render() {
        return (
            <BottomNavigation
                className ="organization-nav"
                selectedIndex={this.state.selectedIndex}
                style={style}
            >
                <BottomNavigationItem
                    label="needs"
                    icon={this.state.needsIcon}
                    onTouchTap={() =>
                    {
                        this.select(0);
                        this.props.history.push(`${this.props.match.path}/needs`);
                    }}
                />
                <BottomNavigationItem
                    label="add need"
                    icon={this.state.addNeedIcon}
                    onTouchTap={() =>
                    {
                        this.select(1);
                        this.props.history.push(`${this.props.match.path}/needs/add`);
                    }}
                />
            </BottomNavigation>
        );
    }
}

export default OrganizationNav;
