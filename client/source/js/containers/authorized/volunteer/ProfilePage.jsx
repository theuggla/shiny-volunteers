import React from 'react';
import ProfileForm from '../../../components/authorized/volunteer/ProfileForm.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import Auth from '../../../modules/Auth';
import axios from 'axios';

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            profile: null,
            errors: {}
        };

        this.processForm = this.processForm.bind(this);
        this.changeProfile = this.changeProfile.bind(this);
    }

    componentWillMount() {
        axios({
            method: 'GET',
            url: '/volunteer/profile',
            headers: {'Authorization': `bearer ${Auth.getToken()}`},
        })
            .then((response) => {
                this.setState({
                    profile: response.data.profile
                });

            })
            .catch((error) => {
                const errors = error.response ? error.response.data.errors ? error.response.data.errors : error.response.data : {summary: 'you seem to be offline'};
                this.setState({
                    errors: errors
                });
            });
    }

    changeProfile(event) {
        const field = event.target.name;
        const profile = this.state.profile;
        profile[field] = event.target.value;

        this.setState({
            profile: profile
        });
    }

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

    render() {
        return (
            this.state.profile ? (
            <ProfileForm
                       onSubmit={this.processForm}
                       onChange={this.changeProfile}
                       errors={this.state.errors}
                       profile={this.state.profile}
            />) : (<CircularProgress />)
        );
    }

}


//Exports.
export default ProfilePage;

