import React from 'react';
import { AuthorizedComponent } from 'react-router-role-authorization';
import auth from '../../../modules/Auth';

class VolunteerMatchPage extends AuthorizedComponent {
    constructor(props) {
        super(props);
        console.log(props);

        this.userRoles = auth.getAuthRoles();
        this.notAuthorizedPath = '/login';
    }

    handleUnauthorizedRole(routeRoles, userRoles){
        // handle unsuccessful authorization somehow
        console.log(`Route is available for roles: ${routeRoles}, but your roles are: ${userRoles}...`);

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <p>And here we are on the volunteerpage</p>
            </div>
        );
    }
}

export default VolunteerMatchPage;
