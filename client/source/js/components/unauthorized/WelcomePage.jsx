import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import UnauthorizedContainer from './UnauthorizedContainer.jsx';


const WelcomePage = React.createClass({
    render: function() {
        return (
            <UnauthorizedContainer>
            <div>Hey yo.</div>
            </UnauthorizedContainer>
        );
    }
});

export default WelcomePage;
