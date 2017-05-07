/**
 * Container component that controls the display of the
 * users applications.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import CheckIcon from 'material-ui/svg-icons/action/done'

import axios from 'axios';
import Auth from '../../../modules/Auth';
import styles from '../../../ReactStyles';

import NeedsList from '../../../components/authorized/NeedsList.jsx';

// Variables--------------------------------------------------------------------------------------------------------------
let noNeedsText = "you haven't made any applications yet! go look at the " +
    "needs that matches your preferences under the matches-tab.";
let serverErrorMessage = "we seem to not be getting a response. ";
let checkIcon = <CheckIcon />;

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Controls the state of the list of applications
 * and communicates with the server.
 */
class ApplicationsPage extends React.Component {

    /**
     * Passes on props and sets initial state.
     * @param props {Object} will be passed on.
     */
    constructor(props) {
        super(props);

        this.state = {
            applications: null,
            offlinePopup: false,
            errors: {
                summary: ""
            }
        };
    }

    /**
     * Makes a call to the server to get the current applications of the logged in user.
     * If no response from server within five seconds, sets offline popup
     * to true.
     */
    componentWillMount() {
        let responseTimeout = setTimeout(() => {
            this.setState({offlinePopup: true});
        }, 5000);

        axios({
            method: 'GET',
            url: '/volunteer/applications',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
                clearTimeout(responseTimeout);

                this.setState({
                    offlinePopup: false,
                    applications: response.data.applications
                });
            })
            .catch((error) => {
                this.state.errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'are you offline?'};
            });
    }

    /**
     * Renders the list when the match information has been received from the server
     * and a loading symbol with a potential offline popup for user communication
     * until then.
     * @returns {Component} A NeedsList without any possible actions, displaying the users applications
     * or a CircularProgress Component.
     */
    render() {
        return (
            this.state.applications ? (
                    <NeedsList
                        needs={this.state.applications}
                        noNeedsText={noNeedsText}
                        action={false}
                        icon={checkIcon}
                        errors={this.state.errors}
                    />) : (
                    <div style={styles.loadcontainer}>
                        <CircularProgress />
                        <Snackbar
                            message={serverErrorMessage + this.state.errors.summary}
                            open={this.state.offlinePopup}
                            bodyStyle={styles.snackbarBody}
                        />
                    </div>
                )
        );
    }

}

// Exports-------------------------------------------------------------------------------------------------------------
export default ApplicationsPage;


