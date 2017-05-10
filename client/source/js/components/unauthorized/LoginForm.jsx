/**
 * A login-form component.
 * A form that wraps different form components
 * and passes the state on to the wrapper component.
 * Will render as a login-form or a signup-form depending
 * on props passed.
 */


// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import styles from '../../ReactStyles';

import RaisedButton from 'material-ui/RaisedButton';
import FacebookLogin from 'react-facebook-login';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

// Class -------------------------------------------------------------------------------------------------------------

/**
 * Renders a login-form or a signup-form depending on the props passed.
 * Can display a snackbar popup with optional action to communicate with the user.
 * Will display the error-state of the wrapper component.
 *
 * @param onSubmit {function} what to do when form is submitted.
 * @param onChange {function} what to do when form-component is changed.
 * @param onFacebookLogin {function} what to do when facebook-button is pressed.
 * @param onPopupConfirm {function} what to do when the popup is confirmed.
 * @param processSignup {function} hat to do if the user signs up.
 * @param errors {Object} the error-state of the wrapper.
 * @param user {Object} The user object to change.
 * @param allowFacebook {Boolean} wheter to display the facebook login button.
 * @param signup {Boolean} whether to display the signup form.
 * @param popup {Boolean} whether to display a popup.
 * @param popupAction {String} what action the popup button will have,
 * @param popupMessage {String} what message to display in the popuo.
 */
const LoginForm = ({
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
                    floatingLabelStyle={styles.loginForm.floatingLabelStyle}
                    inputStyle={styles.loginForm.inputStyle}
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
                    floatingLabelStyle={styles.loginForm.floatingLabelStyle}
                    inputStyle={styles.loginForm.inputStyle}
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
                    floatingLabelStyle={styles.loginForm.floatingLabelStyle}
                    inputStyle={styles.loginForm.inputStyle}
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
                bodyStyle={styles.loginForm.snackbarBodyStyle}
                contentStyle={styles.loginForm.snackbarContentStyle}
            />

        </form>
);

// Exports -----------------------------------------------------------------------------------------------------------
export default LoginForm;
