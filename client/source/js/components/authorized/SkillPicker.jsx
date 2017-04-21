import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const selectableSkills = [
    {value: 0, name: 'Wordpress'},
    {value: 1, name: 'Cooking'},
    {value: 2, name: 'Drivers License'},
    {value: 3, name: 'IT'},
    {value: 4, name: 'Economy'},
    {value: 5, name: 'Funding'},
];

class SkillPicker extends Component {

    constructor(props) {
        super(props);

        this.state.values = this.props.values ?
            selectableSkills
                .filter((skill) => {return this.props.values.includes(skill.name);})
                .map((skill) => {return skill.value})
            : [];

    }

    handleChange = (event, index, values) => {
        this.setState({values});

        let mappedValues = values.map((value) => {
            return selectableSkills[value].name;
        });

        let changeEvent = {
            name: 'skills',
            value: mappedValues
        };

        this.props.onChange(changeEvent);
    };

    selectionRenderer = (values) => {
        switch (values.length) {
            case 0:
                return '';
            case 1:
                return selectableSkills[values[0]].name;
            default:
                return `${values.length} skills selected`;
        }
    };

    menuItems(skills) {
        return skills.map((skill) => (
            <MenuItem
                key={skill.value}
                insetChildren={true}
                checked={this.state.values.includes(skill.value)}
                value={skill.value}
                primaryText={skill.name}
            />
        ));
    }

    render() {
        return (<SelectField
                multiple={true}
                hintText={this.props.hintText}
                value={this.state.values}
                onChange={this.handleChange}
                selectionRenderer={this.selectionRenderer}
            >
                {this.menuItems(selectableSkills)}
            </SelectField>
        );
    }
}

export default SkillPicker;
