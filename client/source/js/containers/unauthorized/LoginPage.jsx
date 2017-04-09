import React, { PropTypes } from 'react';
import LoginForm from '../../components/unauthorized/LoginForm.jsx';
import UnauthorizedContainer from '../../components/unauthorized/UnauthorizedContainer.jsx';
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
                this.setState({
                    errors: {}
                });

                console.log('The form is valid');
                console.log('you are logged in');
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
            <UnauthorizedContainer>
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
            </UnauthorizedContainer>
        );
    }

}


//Exports.
export default LoginPage;
