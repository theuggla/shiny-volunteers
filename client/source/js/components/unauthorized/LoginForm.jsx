import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles = {
    floatingLabelStyle: {
        color: '#F5F5F5',
        textAlign: 'center'
    },
    inputStyle: {
        textAlign: 'center',
        color: '#F5F5F5'
    }
};

const SignUpForm = ({
    onSubmit,
    onChange,
    errors,
    user,
    allowFacebook
}) => (
        <form className="login-form" action="/login/local" method="POST" onSubmit={onSubmit}>
            <h2>Login</h2>

            {errors.summary && <p className="error-message">{errors.summary}</p>}

            <div className="field-line">
                <TextField
                    floatingLabelText="email"
                    name="email"
                    errorText={errors.email}
                    onChange={onChange}
                    value={user.email}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    inputStyle={styles.inputStyle}
                />
            </div>

            <div className="field-line">
                <TextField
                    floatingLabelText="password"
                    type="password"
                    name="password"
                    onChange={onChange}
                    errorText={errors.password}
                    value={user.password}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    inputStyle={styles.inputStyle}
                />
            </div>

            <div className="button-line">
                <RaisedButton type="submit" label="Login" primary />
            </div>


            {allowFacebook &&
            <div className="button-line">
                <a href="/login/facebook"><RaisedButton label="Login with Facebook" primary /></a>
            </div> }

        </form>
);

export default SignUpForm;
