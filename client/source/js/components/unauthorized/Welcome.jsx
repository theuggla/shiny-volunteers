import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const Welcome = ({ history }) => (
    <div className="welcome">
        <h3>spark the revolution</h3>
        <FlatButton className="button-line" label="volunteer" onTouchTap={() => {history.push('/login/volunteer')}} />
        <FlatButton className="button-line" label="find volunteers" onTouchTap={() => {history.push('/login/organization')}} />
    </div>
);

export default Welcome;
