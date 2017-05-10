/**
 * The welcome-component, takes the user to the login-screen.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';
import FlatButton from 'material-ui/FlatButton';

// Class --------------------------------------------------------------------------------------------------------------
/**
 * Renders to buttons that let's the user chose whether to volunteer
 * or find a volunteer, and directs them to the login-sceen with a suitable parameter
 * reflecting that choice.
 * @param history {Object} the react-router history.
 */
const Welcome = ({ history }) => (
    <div className="welcome">
        <h3>spark the revolution</h3>
        <FlatButton className="button-line" label="volunteer" onTouchTap={() => {history.push('/login/volunteer')}} />
        <FlatButton className="button-line" label="find volunteers" onTouchTap={() => {history.push('/login/organization')}} />
    </div>
);

// Exports ------------------------------------------------------------------------------------------------------------
export default Welcome;
