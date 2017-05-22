/**
 * A chip selector that renders selectable values as an array
 * of chips.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import Chip from 'material-ui/Chip';
import Card from 'material-ui/Card';

import styles from '../../ReactStyles';

// Class --------------------------------------------------------------------------------------------------------------
/**
 * A Chip Selector.
 */
class ChipSelector extends React.Component {
    /**
     * Passes on the props.
     * @param props {Object} the props to pass on.
     */
    constructor(props) {
        super(props);

        this.state = {
            selectedValues: null
        };

        this.state.selectedValues = props.selectedValues && props.selectedValues.length > 0 ?
            props.selectableValues
                .filter((item) => {return props.selectedValues.includes(item.name);})
            : [];
    }

    /**
     * Remove a chip from selected values.
     * @param value {number} the value of the chip to remove.
     */
    handleRequestDelete = (value) => {
        this.selectedChips = this.state.selectedValues;
        const chipToDelete = this.selectedChips.map((chip) => chip.value).indexOf(value);

        this.selectedChips.splice(chipToDelete, 1);

        this.setState({selectedValues: this.selectedChips});

        this.handleChange(this.state.selectedValues);
    };

    /**
     * Select a chip.
     * @param value {number} the value of the chip to select.
     */
    handleSelect = (value) => {
        this.selectedChips = this.state.selectedValues;
        const chipToSelect = this.props.selectableValues.map((chip) => chip.value).indexOf(value);

        this.selectedChips.push(this.props.selectableValues[chipToSelect]);

        this.setState({selectedValues: this.selectedChips});

        this.handleChange(this.state.selectedValues);
    };

    /**
     * Handles a change in the selected items.
     * @param values {[number]} an array of indices of all the selected values.
     */
    handleChange = (values) => {
        let mappedValues = values.map((value) => {
                return value.name;
            });

        let changeEvent = {
            target: {
                name: this.props.name,
                value: mappedValues
            }
        };

        this.props.onChange(changeEvent);
    };

    /**
     * Renders a chip with a delete-function that unselects it.
     * @param data {Object} the chip to render.
     * @returns {XML} a styled Chip with a onRequestDelete-function.
     */
    renderSelectedChip(data) {
        return (
            <Chip
                backgroundColor='#00BCD4'
                key={data.value}
                onRequestDelete={() => this.handleRequestDelete(data.value)}
                style={styles.chipSelector.chip}
            >
                {data.name}
            </Chip>
        );
    }

    /**
     * Renders a Chip with an onTouchTap-function that selects it.
     * @param data {Object} the Chip to render.
     * @returns {XML} a Chip with an onTouchTap-function.
     */
    renderUnselectedChip(data) {
        return (
            <Chip
                key={data.value}
                onTouchTap={() => this.handleSelect(data.value)}
                style={styles.chipSelector.chip}
            >
                {data.name}
            </Chip>
        );
    }

    /**
     * Renders all the chips as selected or unselected.
     * @returns {XML} A Card with the selected and unselected Chips.
     */
    render() {
        return (
            <Card style={styles.formCard}>
                <p>{this.props.hintText}</p>
                {this.props.errorText && <p className="error-message">{this.props.errorText}</p>}
                <div>
                    {this.state.selectedValues.map((chip) => {
                        return this.renderSelectedChip(chip)
                    })}
                </div>
                <div>
                    {this.props.selectableValues.filter((value) => {
                        return this.state.selectedValues.indexOf(value) < 0
                    }).map((chip) => {
                        return this.renderUnselectedChip(chip)
                    })}
                </div>
            </Card>
        );
    }
}

// Exports ------------------------------------------------------------------------------------------------------------
export default ChipSelector;
