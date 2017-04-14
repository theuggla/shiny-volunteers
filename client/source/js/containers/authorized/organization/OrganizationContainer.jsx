import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

import OurNeedsPage from './OurNeedsPage.jsx';
import AddNeedPage from './AddNeedPage.jsx';
import EditNeedPage from './EditNeedPage.jsx';

const OrganizationContainer = (props) => (
    <div className="volunteer-app">
        <div className="top-bar">
            <Link to={`${props.match.path}/tasks`}>tasks</Link>
            <Link to={`${props.match.path}/profile`}>profile</Link>
        </div>

        <Redirect exact path={`${props.match.path}/`} to={`${props.match.path}/needs`}/>
        <Route path={`${props.match.path}/needs`}  component={OurNeedsPage}/>
        <Route path={`${props.match.path}/needs/add`}  component={AddNeedPage}/>
        <Route path={`${props.match.path}/needs/edit`}  component={EditNeedPage}/>
    </div>
);

export default OrganizationContainer;
