let React = require('react');
let ReactDOM = require('react-dom');
let DropdownButton = require('react-bootstrap').DropdownButton;
let MenuItem = require('react-bootstrap').MenuItem;
let Button = require('react-bootstrap').Button;
let ButtonGroup = require('react-bootstrap').ButtonGroup;
let Grid = require('react-bootstrap').Grid;
let Row = require('react-bootstrap').Row;
let Col = require('react-bootstrap').Col;
let Clearfix = require('react-bootstrap').Clearfix;
require('../css/style.css');

let buttonGroupInstance = (
    <ButtonGroup>
        <DropdownButton id="dropdown-btn-menu" bsStyle="success" title="Dropdown">
            <MenuItem key="1">Dropdown link</MenuItem>
            <MenuItem key="2">Dropdown link</MenuItem>
        </DropdownButton>
        <Button bsStyle="info">Middle</Button>
        <Button bsStyle="info" id="restyle">Right</Button>
    </ButtonGroup>
);

const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.'];

const gridInstance = (
    <Grid>
        <Row className="show-grid">
            <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 6).join(' ')}</Col>
            <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 4).join(' ')}</Col>
            <Clearfix visibleSmBlock><code>&lt;{'Clearfix visibleSmBlock'} /&gt;</code></Clearfix>
            <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 6).join(' ')}</Col>
            <Col sm={6} md={3}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 2).join(' ')}</Col>
        </Row>
    </Grid>
);

let HelloWorld = React.createClass({
    render: function() {
        return (
        <p>Hello, {this.props.greetTarget}!</p>
        );
    }
});

module.exports = gridInstance;
