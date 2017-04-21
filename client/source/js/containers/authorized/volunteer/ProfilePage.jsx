import React from 'react';
import ProfileForm from '../../../components/authorized/volunteer/ProfileForm.jsx';
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
            console.log('got response profile');
            console.log(response.data.profile);
                this.setState({
                    profile: response.data.profile
                });

            })
            .catch((error) => {
            console.log('or got an error');
            console.log(error);
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
        console.log('sending form with data');
        console.log(this.state.profile);
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
            <ProfileForm className="profile-page"
                       onSubmit={this.processForm}
                       onChange={this.changeProfile}
                       errors={this.state.errors}
                       profile={this.state.profile}
            />) : (<p>Loading</p>)
        );
    }

}


//Exports.
export default ProfilePage;

