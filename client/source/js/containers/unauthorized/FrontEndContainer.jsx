import React from 'react';
import { Link, Route } from 'react-router-dom';

import Background from '../../../assets/intro-bg.jpg';

import Welcome from '../../components/unauthorized/Welcome.jsx';
import LoginPage from './LoginPage.jsx';
import About from '../../components/unauthorized/About.jsx';


const Container = ({ match }) => (
            <div style={{color: 'white', height: '100vh', width: '100vw', backgroundImage: `url(${Background})`}}>
                <div className="top-bar">
                        <Link to="/about">About</Link>
                        <Link to="/">Shiny App</Link>
                        <Link to="/login">Login</Link>
                </div>

                <Route exact path={`${match.url}`} component={Welcome}/>
                <Route path="/login"  component={LoginPage}/>
                <Route path="/about" component={About}/>
            </div>
);

export default Container;
