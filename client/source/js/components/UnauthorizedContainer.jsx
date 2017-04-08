import React from 'react';
import { PropTypes } from 'react';
import { Link } from 'react-router-dom';


const Container = React.createClass({
    render: function () {
        return (
            <div>
                <div className="top-bar">
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
