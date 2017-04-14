import React from 'react';
import LoginForm from '../../components/unauthorized/LoginForm.jsx';
import auth from '../../modules/Auth';
import axios from 'axios';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    //update user details
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user: user
        });
    }

    processForm(event) {
        //prevent form from sending
        console.log(event);
        event.preventDefault();

        axios.post('/login/local', {
            email: this.state.user.email,
            password: this.state.user.password,
            role: this.props.match.params.role
        })
            .then((response) => {
                this.setState({
                    errors: {}
                });
                auth.authenticateUser(response.token, response.data.user.roles);
                this.props.history.push('/' + response.data.user.roles[0]);
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
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
                allowFacebook = {this.props.match.params.role === 'volunteer'}
            />
        );
    }

}


//Exports.
export default LoginPage;
