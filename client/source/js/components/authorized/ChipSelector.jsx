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
     * Sets state and passes on the props.
     * @param props {Object} the props to pass on.
     */
    constructor(props) {
        super(props);

        this.state = {
            selectedChips: [],
            unselectedChips: []
        };

        this.state.selectedChips = props.selectedValues && props.selectedValues.length > 0 ?
                props.selectableValues
                    .filter((item) => {return props.selectedValues.includes(item.name);})
                : [];

        this.state.unselectedChips = props.selectedValues ?
            props.selectableValues
                .filter((item) => {return !props.selectedValues.includes(item.name);})
            : props.selectableValues;
    }

    /**
     * Remove a chip from selected values.
     * @param value {number} the value of the chip to remove.
     */
    handleRequestDelete = (value) => {
        this.selectedChips = this.state.selectedChips;
        this.unselectedChips = this.state.unselectedChips;
        const chipToDelete = this.selectedChips.map((chip) => chip.value).indexOf(value);

        this.unselectedChips.push(this.selectedChips[chipToDelete]);
        this.selectedChips.splice(chipToDelete, 1);

        this.setState({
            selectedChips: this.selectedChips,
            unselectedChips: this.unselectedChips
        });

        this.handleChange(this.state.selectedChips);
    };

    /**
     * Select a chip.
     * @param value {number} the value of the chip to select.
     */
    handleSelect = (value) => {
        this.selectedChips = this.state.selectedChips;
        this.unselectedChips = this.state.unselectedChips;
        const chipToSelect = this.unselectedChips.map((chip) => chip.value).indexOf(value);

        this.selectedChips.push(this.unselectedChips[chipToSelect]);
        this.unselectedChips.splice(chipToSelect, 1);

        this.setState({
            selectedChips: this.selectedChips,
            unselectedChips: this.unselectedChips
        });

        this.handleChange(this.state.selectedChips);
    };

    /**
     * Handles a change in the selected items.
     * @param values {[number]} an array of indices of all the selected values
     * if multiple enabled.
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
                    {this.state.selectedChips.map((chip) => {return this.renderSelectedChip(chip)})}
                </div>
                <div>
                    {this.state.unselectedChips.map((chip) => {return this.renderUnselectedChip(chip)})}
                </div>
            </Card>
        );
    }
}

// Exports ------------------------------------------------------------------------------------------------------------
export default ChipSelector;
