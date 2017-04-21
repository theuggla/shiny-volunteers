import React from 'react';
import NeedsForm from '../../../components/authorized/organization/NeedsForm.jsx';
import Auth from '../../../modules/Auth';
import axios from 'axios';

class AddNeedPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            need: {},
            errors: {}
        };

        this.processForm = this.processForm.bind(this);
        this.changeNeed = this.changeNeed.bind(this);
    }

    changeNeed(event) {
        const field = event.name;
        const need = this.state.need;
        need[field] = event.value;

        this.setState({
            need: need
        });
    }

    processForm(event) {
        event.preventDefault();
        axios({
            method: 'POST',
            url: '/organization/needs/add',
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

    render() {
        return (
                    <NeedsForm className="needs-page"
                                 onSubmit={this.processForm}
                                 onChange={this.changeNeed}
                                 errors={this.state.errors}
                                 need={this.state.need}
                    />
        );
    }

}


//Exports.
export default AddNeedPage;


