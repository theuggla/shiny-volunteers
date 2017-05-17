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
    location: [],
    categories: [],
    recurring: [],
    timePerOccasion: [],
    skillsNeeded: [
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
            }
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

        this.setState({
            need: need
        });
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
            />
        );
    }
}

// Exports ------------------------------------------------------------------------------------------------------------
export default AddNeedPage;


