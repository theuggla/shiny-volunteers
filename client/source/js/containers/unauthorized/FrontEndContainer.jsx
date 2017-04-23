import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';

import Welcome from '../../components/unauthorized/Welcome.jsx';
import LoginPage from './LoginPage.jsx';
import About from '../../components/unauthorized/About.jsx';

let style = {
    frontend: {
        height: '100vh',
        color: 'white',
        overflow: 'scroll'
    },

};


const Container = ({ match }) => (
            <div className="front-end app-container" style={style.frontend}>
                <div className="flex-box">
                <div className="top-bar">
                    <Link id="start-link" to="/"><img src="/assets/logo.png" style={{maxHeight:"20vh", margin: '3vh'}}/></Link>
                </div>
                    <div className="main-space-front">
                        <Route exact path="/" render={(props) => (<Welcome history={props.history}/>)}/>
                        <Route path="/login/:role"  render={(props) => (<LoginPage {...props}/>)}/>
                        <Route path="/about" component={About}/>
                    </div>
                <div className="bottom-bar">
                    <Link id="about-link" to="/about">what is this</Link>
                </div>
                </div>
            </div>
);

export default Container;
