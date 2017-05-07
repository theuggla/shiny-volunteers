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
            errors: {}
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
        let responseTimeout = setTimeout(() => {
            this.setState({offlinePopup: true});
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
                console.log(error);
                console.log(error.response);
                this.state.errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'are you offline?'};
            });
    }

    /**
     * Controls state of the profile components.
     * @param event {Object} The event that fires when a component is changed.
     */
    changeProfile(event) {
        const field = event.target.name;
        const profile = this.state.profile;
        profile[field] = event.target.value;

        this.setState({
            profile: profile
        });
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
            />) : (
                <div style={styles.loadcontainer}>
                    <CircularProgress />
                    <Snackbar
                        message={"we seem to not be getting a response. " + this.state.errors.summary}
                        open={this.state.offlinePopup}
                        bodyStyle={styles.snackbarBody}
                    />
                </div>
            )
        );
    }

}

// Exports ------------------------------------------------------------------------------------------------------------
export default ProfilePage;

