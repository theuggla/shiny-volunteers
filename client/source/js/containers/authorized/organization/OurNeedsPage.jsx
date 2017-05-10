/**
 * Container component that controls the display of the
 * users added needs.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import RemoveIcon from 'material-ui/svg-icons//content/clear';
import Snackbar from 'material-ui/Snackbar';

import Auth from '../../../modules/Auth';
import axios from 'axios';
import styles from '../../../ReactStyles';

import NeedsList from '../../../components/authorized/NeedsList.jsx';

// Variables--------------------------------------------------------------------------------------------------------------
let noNeedsText = "you haven't registered any needs yet! think of what you need and go add something " +
    "under the add-need-tab.";
let confirmPrompt = "confirming will remove the need permanently";
let serverErrorMessage = "we seem to not be getting a response. ";

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Controls the state of the list of needs
 * and communicates with the server.
 */
class OurNeedsPage extends React.Component {

    /**
     * Passes on props, binds functions and sets initial state.
     * @param props {Object} will be passed on.
     */
    constructor(props) {
        super(props);

        this.state = {
            needs: null,
            offlinePopup: false,
            errors: {
                summary: ""
            },
            reload: false
        };

        this.removeNeed = this.removeNeed.bind(this);
    }

    /**
     * Makes a call to the server to get the current needs of the logged in user.
     * If no response from server within five seconds, sets offline popup
     * to true.
     */
    componentWillMount() {
        let responseTimeout = setTimeout(() => {
            this.setState({offlinePopup: true});
        }, 5000);

        axios({
            method: 'GET',
            url: '/organization/needs',
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
     * Makes a request against the server to delete the need.
     * Reloads the page when the need has been deleted.
     * @param id {string} The id of the need to remove.
     */
    removeNeed(id) {
        axios({
            method: 'DELETE',
            url: '/organization/needs/' + id,
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
                this.setState({reload: true});
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
     * @returns {Component} A NeedsList with an action that lets you remove a need
     * or a CircularProgress Component.
     */
    render() {
        return (
            this.state.needs ? (
                    <NeedsList
                        needs={this.state.needs}
                        errors={this.state.errors}
                        action={true}
                        onClick={this.removeNeed}
                        confirmPrompt={confirmPrompt}
                        noNeedsText={noNeedsText}
                        icon={<RemoveIcon />}
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


// Exports ------------------------------------------------------------------------------------------------------------
export default OurNeedsPage;

