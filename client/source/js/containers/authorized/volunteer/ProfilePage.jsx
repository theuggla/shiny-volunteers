/**
 * Container-component that wraps the  profile form for the user to set up the profile.
 * Will render the form and pass down state as props.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import Auth from '../../../modules/Auth';
import axios from 'axios';
import styles from '../../../ReactStyles';

import ProfileForm from '../../../components/authorized/volunteer/ProfileForm.jsx';

// Configs ------------------------------------------------------------------------------------------------------------

const selectables = {
    location: [
        {value: 0, name: 'Gothenburg'},
        {value: 1, name: 'London'},
        {value: 2, name: 'Remotely'},
    ],
    interests: [
        {value: 0, name: 'Animals'},
        {value: 1, name: 'Language'},
        {value: 2, name: 'Kids'},
        {value: 3, name: 'Immigration'},
        {value: 4, name: 'Food'},
        {value: 5, name: 'Women'},
        {value: 6, name: 'Homelessness'},
    ],
    recurring: [
        {value: 0, name: 'Once'},
        {value: 1, name: 'Recurringly'},
        {value: 2, name: 'Both'},
    ],
    timePerOccasion: [
        {value: 0, name: 'up to 2h'},
        {value: 1, name: 'up to 5h'},
        {value: 2, name: 'up to 8h'},
        {value: 3, name: 'up to 10h'},
    ],
    skills: [
        {value: 0, name: 'Wordpress'},
        {value: 1, name: 'Cooking'},
        {value: 2, name: 'Drivers License'},
        {value: 3, name: 'IT'},
        {value: 4, name: 'Economy'},
        {value: 5, name: 'Funding'},
    ],
};

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Container that controls the state of the Profile Form
 * And sends and gets profile data concerning the user from the server.
 * Renders a loading symbol or the form.
 */
class ProfilePage extends React.Component {

    /**
     * Passes on props, binds methods and sets initial state.
     * @param props {Object} will be passed on.
     */
    constructor(props) {
        super(props);

        this.state = {
            profile: null,
            offlinePopup: false,
            errors: {},
            isComplete: false
        };

        this.processForm = this.processForm.bind(this);
        this.changeProfile = this.changeProfile.bind(this);
    }

    /**
     * Makes a call to the server to get the saved
     * profile information for the logged in user.
     * If no response from server within five seconds, sets offline popup
     * to true.
     */
    componentWillMount() {
        this.state.profile = {};

        /*
        let responseTimeout = setTimeout(() => {
            this.state.offlinePopup = true;
        }, 5000);

        axios({
            method: 'GET',
            url: '/volunteer/profile',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
                clearTimeout(responseTimeout);

                this.setState({
                    offlinePopup: false,
                    profile: response.data.profile
                });

            })
            .catch((error) => {
                this.state.errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'are you offline?'};
            });*/
    }

    /**
     * Controls state of the profile components.
     * @param event {Object} The event that fires when a component is changed.
     */
    changeProfile(event) {
        const field = event.target.name;
        const profile = this.state.profile;
        profile[field] = event.target.value;

        let complete = this.isFormComplete() && this.isFormValid();

        this.setState({
            profile: profile,
            isComplete: complete
        });
    }

    /**
     * Checks if the form is complete.
     * @returns {boolean} true if the form is complete.
     */
    isFormComplete() {
        let complete = true;
        let keys = Object.keys(this.state.profile);

        if (keys.length < 7) {
            complete = false;
        } else {
            keys.forEach(key => {
                if (this.state.profile[key] === undefined || this.state.profile[key] === null) {
                    complete = false;
                }
            });
        }

        return complete;
    }

    /**
     * Validates the form components.
     * @returns {boolean} true if everything has been filled in correctly.
     */
    isFormValid() {
        let valid = true;
        let keys = Object.keys(this.state.profile);
        let errors = {};

        keys.forEach(key => {
            if ( this.state.profile[key].length === 0
                || this.state.profile[key] === null) {

                errors[key] = 'need to put something here';
                valid = false;

            } else if (key === 'email' && !(/.+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(this.state.profile.email)) {
                errors.email = 'email is not valid';
                valid = false;
            }
        });

        this.setState({errors: errors});
        return valid;
    }

    /**
     * Sends the profile form-data to the server.
     * Redirects the user when the data has been sent.
     * @param event {Object} The event that fires when the form is submitted.
     */
    processForm(event) {
        event.preventDefault();

        axios({
            method: 'POST',
            url: '/volunteer/profile',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
            data: this.state.profile
            })
            .then((response) => {
                this.setState({
                    errors: {}
                });
                this.props.history.push('/');
            })
            .catch((error) => {
                const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
                this.setState({
                    errors: errors
                });
            });
    }

    /**
     * Renders the form when the profile information has been received from the server
     * and a loading symbol with a potential offline popup for user communication
     * until then.
     * @returns {Component} The form or a CircularProgress Component.
     */
    render() {
        return (
            this.state.profile ? (
            <ProfileForm
                       onSubmit={this.processForm}
                       onChange={this.changeProfile}
                       errors={this.state.errors}
                       profile={this.state.profile}
                       selectables={selectables}
                       isComplete={this.state.isComplete}
            />) : (
                <div style={styles.loadcontainer}>
                    <CircularProgress />
                    <Snackbar
                        message={'we seem to not be getting a response. ' + this.state.errors.summary || ''}
                        open={this.state.offlinePopup}
                        bodyStyle={styles.internalPopup.snackbarBody}
                    />
                </div>
            )
        );
    }

}

// Exports ------------------------------------------------------------------------------------------------------------
export default ProfilePage;

