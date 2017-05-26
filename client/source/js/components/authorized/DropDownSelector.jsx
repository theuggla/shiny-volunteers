/**
 * A modal drop-down-selector that takes an array if items to select from.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React, {Component} from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import styles from '../../ReactStyles';

// Class -------------------------------------------------------------------------------------------------------------

/**
 * A DropDownSelector.
 */
class DropDownSelector extends Component {

    /**
     * Sets state and passes on the props.
     * @param props {Object} the props to pass on.
     */
    constructor(props) {
        super(props);

        this.state = {
            selectedValues: null
        };

        let selected;

        if (props.selectedValues) {
            selected = props.multiple ? props.selectedValues.map((item) => {return item.toString()}) : [props.selectedValues].map((item) => {return item.toString()});

            selected = (props.selectableValues
                .filter((item) => {return selected.includes(item.name);})
                .map((item) => {return item.value}));

            if (!props.multiple) {
                selected = selected[0];
            }
        } else if (props.multiple){
            selected = [];
        }

        this.state.selectedValues = selected;
    }

    /**
     * Handles a change in the selected items.
     * @param event {Object} the event triggered on the change.
     * @param index {number} The index of the newly selected item.
     * @param values {[number]} an array of indices of all the selected values
     * if multiple enabled.
     */
    handleChange = (event, index, values) => {
        this.setState({selectedValues: values});

        let mappedValues = Array.isArray(values) ? values.map((value) => {
            return this.props.selectableValues[value].name;
        }) : this.props.selectableValues[values].name;

        let changeEvent = {
            target: {
                name: this.props.name,
                value: mappedValues
            }
        };

        this.props.onChange(changeEvent);
    };

    /**
     * Maps an array of items to MenuItem components.
     * @param items {[Object]} the objects to map.
     */
    menuItems(items) {
        return items.map((item) => (
            <MenuItem
                key={item.value}
                insetChildren={true}
                checked={this.props.multiple ? this.state.selectedValues.includes(item.value) : this.state.selectedValues === (item.value)}
                value={item.value}
                label={item.label}
                primaryText={item.name}
            />
        ));
    }

    /**
     * @returns {Component} the controlled component as a wrapped SelectField.
     */
    render() {
        return (<SelectField
                multiple={this.props.multiple}
                floatingLabelText={this.props.hintText}
                floatingLabelStyle={styles.centerText}
                underlineShow={false}
                value={this.state.selectedValues}
                errorText={this.props.errorText}
                onChange={this.handleChange}
                autoWidth={true}
                dropDownMenuProps={{
                    anchorOrigin: {vertical: 'bottom', horizontal: 'middle'},
                    targetOrigin: {vertical: 'top', horizontal: 'middle'}
                }}
                style={styles.dropDownSelector}
            >
                {this.menuItems(this.props.selectableValues)}
            </SelectField>
        );
    }
}

// Exports ------------------------------------------------------------------------------------------------------------
export default DropDownSelector;
