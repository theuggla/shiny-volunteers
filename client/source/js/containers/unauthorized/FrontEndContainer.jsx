/**
 * Front-end container, routes to the Welcome, About and Login-components.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import style from '../../ReactStyles';

import Welcome from '../../components/unauthorized/Welcome.jsx';
import LoginPage from './LoginPage.jsx';
import About from '../../components/unauthorized/About.jsx';

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Routes the user and renders different components based on window location.
 */
const Container = ({ match }) => (
            <div className="front-end app-container">
                <div className="top-bar">
                    <Link id="start-link" to="/"><img src="/assets/logo.png" style={style.topbar.logo}/></Link>
                </div>
                    <div className="main-space-front">
                        <Switch>
                            <Route path="/login/:role"  render={(props) => (<LoginPage {...props}/>)}/>
                            <Route path="/about" component={About}/>
                            <Route path="/" render={(props) => ((<Welcome history={props.history}/>))} />
                        </Switch>
                    </div>
                <div className="bottom-bar">
                    <Link id="about-link" to="/about">what is this</Link>
                </div>
            </div>
);

// Exports ------------------------------------------------------------------------------------------------------------
export default Container;
