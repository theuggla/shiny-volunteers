/**
 * Container component that controls the display of the matches between the user's preferences
 * and their needs.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import AddIcon from 'material-ui/svg-icons/content/add-circle-outline';
import Snackbar from 'material-ui/Snackbar';

import Auth from '../../../modules/Auth';
import axios from 'axios';
import styles from '../../../ReactStyles';

import NeedsList from '../../../components/authorized/NeedsList.jsx';

// Variables--------------------------------------------------------------------------------------------------------------
let noNeedsText = "there are no matches for you at the moment. either your profile is not filled in or no " +
        "organization has a need that matches your preferences. hang in there.";
let confirmPrompt = "your information will be sent out to the organization.";
let serverErrorMessage = "we seem to not be getting a response. ";
let actionPrompt = "click the plus-sign to apply for the match.";

// Class---------------------------------------------------------------------------------------------------------------

/**
 * Controls the state of the list of matches
 * and communicates with the server.
 */
class MatchPage extends React.Component {

    /**
     * Passes on props, binds methods and sets initial state.
     * @param props {Object} will be passed on.
     */
    constructor(props) {
        super(props);

        this.state = {
            needs: null,
            offlinePopup: false,
            errors: {}
        };

        this.applyForMatch = this.applyForMatch.bind(this);
    }

    /**
     * Makes a call to the server to get the current matched needs for the logged in user.
     * If no response from server within five seconds, sets offline popup
     * to true.
     */
    componentWillMount() {
        let responseTimeout = setTimeout(() => {
            this.setState({offlinePopup: true});
        }, 5000);

        axios({
            method: 'GET',
            url: '/volunteer/match',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
                clearTimeout(responseTimeout);

                this.setState({
                    offlinePopup: false,
                    needs: response.data.needs
                });

            })
            .catch((error) => {
                this.state.errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'are you offline?'};
            });

    }

    /**
     * Makes an application for a need against the server.
     * Redirects the user to the applications-page when the data has been sent.
     * @param id {string} The id of the need to apply for.
     */
    applyForMatch(id) {
            axios({
                method: 'POST',
                url: '/volunteer/applications',
                headers: {'Authorization': `bearer ${Auth.getToken()}`},
                data: {
                    id: id,
                }
            })
                .then((response) => {
                    this.props.history.push('/volunteer/applications');
                })
                .catch((error) => {
                    const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
                    this.setState({
                        errors: errors
                    });
                });
    }

    /**
     * Renders the list when the match information has been received from the server
     * and a loading symbol with a potential offline popup for user communication
     * until then.
     * @returns {Component} A NeedsList with an action that lets you apply for matches.
     * or a CircularProgress Component.
     */
    render() {
        return (
            this.state.needs ? (
                    <NeedsList
                               needs={this.state.needs}
                               errors={this.state.errors}
                               action={true}
                               onClick={this.applyForMatch}
                               confirmPrompt={confirmPrompt}
                               noNeedsText={noNeedsText}
                               actionPrompt={actionPrompt}
                               icon={<AddIcon />}
                    />) : (
                    <div style={styles.loadcontainer}>
                        <CircularProgress />
                        <Snackbar
                            message={serverErrorMessage + this.state.errors.summary}
                            open={this.state.offlinePopup}
                            bodyStyle={styles.internalPopup.snackbarBody}
                        />
                    </div>
                )
        );
    }
}

// Exports--------------------------------------------------------------------------------------------------------------
export default MatchPage;

