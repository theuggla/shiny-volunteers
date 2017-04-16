import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const Welcome = ({ history }) => (
    <div className="welcome">
        <h3>spark the revolution</h3>
        <FlatButton label="volunteer" onTouchTap={() => {history.push('/login/volunteer')}} />
        <FlatButton label="find volunteers" onTouchTap={() => {history.push('/login/organization')}} />
    </div>
);

export default Welcome;
