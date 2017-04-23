import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookLogin from 'react-facebook-login';
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
    onFacebookLogin,
    errors,
    user,
    allowFacebook
}) => (
        <form className="login-form" action="/login/local" method="POST" onSubmit={onSubmit}>

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
                <FacebookLogin
                    appId="1228933440537912"
                    autoLoad={false}
                    fields="name,email,id"
                    scope="public_profile,email"
                    callback={onFacebookLogin}
                    cssClass="facebook-button"
                    redirectUri={window.location.hostname}
                />
            </div> }

        </form>
);

export default SignUpForm;
