import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import NeedsList from '../../../components/authorized/NeedsList.jsx';
import Auth from '../../../modules/Auth';
import axios from 'axios';

class ApplicationsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            applications: null,
            errors: {}
        };
    }

    componentWillMount() {
        axios({
            method: 'GET',
            url: '/volunteer/applications',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
                this.setState({
                    applications: response.data.applications
                });

            })
            .catch((error) => {
                const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
                this.setState({
                    errors: errors
                });
            });
    }

    render() {
        return (
            this.state.applications ? (
                    <NeedsList
                        needs={this.state.applications}
                        clickable={false}
                    />) : (<CircularProgress />)
        );
    }

}


//Exports.
export default ApplicationsPage;


