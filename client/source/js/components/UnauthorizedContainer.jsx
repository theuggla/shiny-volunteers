import React from 'react';
import { PropTypes } from 'react';
import { Link } from 'react-router-dom';


const Container = React.createClass({
    render: function () {
        return (
            <div style={{
                color: '#4DD0E1',
            }}>
                <div className="top-bar" style={{
                    fontSize: '1em',
                }}>
                        <Link to="/about">About</Link>
                        <Link to="/">Shiny App</Link>
                        <Link to="/login">Login</Link>
                </div>

                {this.props.children}

            </div>
        )
    }
});

Container.propTypes = {
    children: PropTypes.object.isRequired
};

export default Container;
