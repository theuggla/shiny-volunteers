import React, { PropTypes } from 'react';
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
        event.preventDefault();

        axios.post('/login/local', {
            email: this.state.user.email,
            password: this.state.user.password
        })
            .then((response) => {
            console.log(response);
                this.setState({
                    errors: {}
                });
                console.log(response.data.user);
                auth.authenticateUser(response.token, response.data.user.roles);

                console.log('The form is valid');
                console.log('you are logged in');
                this.props.history.push('/volunteer/matches');
            })
            .catch((error) => {
            console.log(error);
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
            />
        );
    }

}


//Exports.
export default LoginPage;
