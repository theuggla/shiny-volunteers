import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import Background from '../../../assets/intro-bg.jpg';
import Auth from '../../modules/Auth';

import Welcome from '../../components/unauthorized/Welcome.jsx';
import LoginPage from './LoginPage.jsx';
import About from '../../components/unauthorized/About.jsx';


const Container = ({ match }) => (
            <div className="front-end app-container" style={{color: 'white', height: '100vh', width: '100vw', backgroundImage: `url(${Background})`}}>
                <div className="top-bar">
                    <Link id="about-link" to="/about">About</Link>
                    <Link id="start-link" to="/"><img src="/assets/logo.png" /></Link>
                </div>

                <Route exact path="/" render={(props) => (<Welcome history={props.history}/>)}/>
                <Route path="/login/:role"  render={(props) => (<LoginPage {...props}/>)}/>
                <Route path="/about" component={About}/>
            </div>
);

export default Container;
