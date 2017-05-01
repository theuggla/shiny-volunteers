import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const Confirm = ({ history }) => (
    <div className="confirm">
        <p>You have been sent a confirmation email. Wait for it to arrive to confirm your registration, or sign up again if you think a mistake have been made:</p>
        <FlatButton className="button-line" label="volunteer" onTouchTap={() => {history.push('/login/volunteer')}} />
        <FlatButton className="button-line" label="find volunteers" onTouchTap={() => {history.push('/login/organization')}} />
    </div>
);

export default Confirm;
