import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


const SignUpForm = ({
    onSubmit,
    onChange,
    errors,
    user,
}) => (
        <form action="/login/local" method="POST" onSubmit={onSubmit}>
            <h2>Login</h2>

            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line">
                <TextField
                    floatingLabelText="Email"
                    name="email"
                    errorText={errors.email}
                    onChange={onChange}
                    value={user.email}
                    style={{
                        maxWidth: '80%',
                        textAlign: 'center'
                    }}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="Password"
                    type="password"
                    name="password"
                    onChange={onChange}
                    errorText={errors.password}
                    value={user.password}
                    style={{
                        maxWidth: '80%',
                        textAlign: 'center'
                    }}
                />
            </div>

            <div className="button-line">
                <RaisedButton type="submit" label="Login" primary />
                <a href="/login/facebook"><RaisedButton label="Login with Facebook" primary /></a>
            </div>
        </form>
);

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignUpForm;
