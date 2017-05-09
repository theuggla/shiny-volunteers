import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FacebookLogin from 'react-facebook-login';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

const styles = {
    floatingLabelStyle: {
        color: '#F5F5F5',
        textAlign: 'center'
    },
    inputStyle: {
        textAlign: 'center',
        color: '#F5F5F5',
    },
    snackbarBodyStyle: {
        height: 'auto',
        lineHeight: '1.8em'
    },
    snackbarContentStyle: {
        padding: '1em'
    }
};

const SignUpForm = ({
    onSubmit,
    onChange,
    onFacebookLogin,
    onPopupConfirm,
    processSignup,
    errors,
    user,
    allowFacebook,
    signup,
    popup,
    popupAction,
    popupMessage
}) => (
        <form className="login-form" action="/login/local" method="POST" onSubmit={ signup ? processSignup : onSubmit}>

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
                    autoFocus={(!signup)}
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
                    autoFocus={false}
                />
            </div>

            {signup && <div className="field-line">
                <TextField
                    floatingLabelText="confirm password"
                    type="password"
                    name="passwordConfirm"
                    onChange={onChange}
                    errorText={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    inputStyle={styles.inputStyle}
                    autoFocus={(signup)}
                />
            </div>}

            <div className="button-line">
                <RaisedButton type="submit" label={signup ? "Sign up" : "Log in"} primary />
            </div>


            {allowFacebook &&
            <div className="button-line">
                <FacebookLogin
                    appId={process.env.FACEBOOK_ID}
                    autoLoad={true}
                    fields="name,email,id"
                    scope="public_profile,email"
                    callback={onFacebookLogin}
                    cssClass="facebook-button"
                />
            </div> }

            <Snackbar
                open={popup}
                message={popupMessage}
                action={popupAction}
                onActionTouchTap={onPopupConfirm}
                bodyStyle={styles.snackbarBodyStyle}
                contentStyle={styles.snackbarContentStyle}
                className="signup-popup"
            />

        </form>
);

export default SignUpForm;
