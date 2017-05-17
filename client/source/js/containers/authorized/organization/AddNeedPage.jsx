/**
 * Container-component that wraps the need form for the user to add a need.
 * Will render the form and pass down state as props.
 */

// Imports ------------------------------------------------------------------------------------------------------------

import React from 'react';

import Auth from '../../../modules/Auth';
import axios from 'axios';

import NeedsForm from '../../../components/authorized/organization/NeedsForm.jsx';

// Configs ------------------------------------------------------------------------------------------------------------

let selectables = {
    location: [
        {value: 0, name: 'Gothenburg'},
        {value: 1, name: 'London'},
        {value: 2, name: 'Remotely'},
    ],
    categories: [
        {value: 0, name: 'Animals'},
        {value: 1, name: 'Language'},
        {value: 2, name: 'Kids'},
        {value: 3, name: 'Immigration'},
        {value: 4, name: 'Food'},
        {value: 5, name: 'Women'},
        {value: 6, name: 'Homelessness'},
    ],
    numberOfTimes: [
        {value: 0, name: 'Once'},
        {value: 1, name: 'Recurring'},
        {value: 2, name: 'Either'},
    ],
    timePerOccasion: [
        {value: 0, name: '1-2h'},
        {value: 1, name: '2-5h'},
        {value: 2, name: '5-8h'},
        {value: 3, name: '8-10h'},
    ],
    skillsRequired: [
        {value: 0, name: 'Wordpress'},
        {value: 1, name: 'Cooking'},
        {value: 2, name: 'Drivers License'},
        {value: 3, name: 'IT'},
        {value: 4, name: 'Economy'},
        {value: 5, name: 'Funding'},
        {value: 6, name: 'Good with children'},
        {value: 7, name: 'Languages'},
        {value: 8, name: 'Medical knowledge'},
        {value: 9, name: 'None'},
    ],
    skillsDesired: [
        {value: 0, name: 'Wordpress'},
        {value: 1, name: 'Cooking'},
        {value: 2, name: 'Drivers License'},
        {value: 3, name: 'IT'},
        {value: 4, name: 'Economy'},
        {value: 5, name: 'Funding'},
        {value: 6, name: 'Good with children'},
        {value: 7, name: 'Languages'},
        {value: 8, name: 'Medical knowledge'},
        {value: 9, name: 'None'},
    ],
};

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Container that controls the state of the AddNeed Form
 * And sends the need data to the server.
 * Renders a loading symbol or the form.
 */
class AddNeedPage extends React.Component {

    /**
     * Passes on props, binds methods and sets initial state.
     * @param props {Object} will be passed on.
     */
    constructor(props) {
        super(props);

        this.state = {
            need: {},
            errors: {
                summary: ""
            },
            isComplete: false
        };

        this.processForm = this.processForm.bind(this);
        this.changeNeed = this.changeNeed.bind(this);
    }

    /**
     * Controls state of the need-form components.
     * @param event {Object} The event that fires when a component is changed.
     */
    changeNeed(event) {
        const field = event.target.name;
        const need = this.state.need;
        need[field] = event.target.value;

        let complete = this.isFormComplete() && this.isFormValid();

        this.setState({
            need: need,
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

        if (keys.length < 10) {
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
            }
        });

        this.setState({errors: errors});

        return valid;
    }

    /**
     * Sends the add need form-data to the server.
     * Redirects the user when the data has been sent.
     * @param event {Object} The event that fires when the form is submitted.
     */
    processForm(event) {
        event.preventDefault();

        axios({
            method: 'POST',
            url: '/organization/needs',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
            data: this.state.need
        }).then(() => {
                this.setState({
                    errors: {}
                });
                this.props.history.push('/');
        }).catch((error) => {
                const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
                this.setState({
                    errors: errors
                });
            });
    }

    /**
     * Renders the form.
     */
    render() {
        return (
            <NeedsForm
                className="needs-page"
                onSubmit={this.processForm}
                onChange={this.changeNeed}
                errors={this.state.errors}
                need={this.state.need}
                selectables={selectables}
                isComplete={this.state.isComplete}
            />
        );
    }
}

// Exports ------------------------------------------------------------------------------------------------------------
export default AddNeedPage;


