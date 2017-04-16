let React = require('react');

class Foo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="foo"><p>Oi</p></div>);
    }
}

module.exports = Foo;
