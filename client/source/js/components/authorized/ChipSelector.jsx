import React from 'react';

import Chip from 'material-ui/Chip';
import Card from 'material-ui/Card';

import styles from '../../ReactStyles';

class ChipSelector extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedChips: null,
            unselectedChips: null
        };

        this.state.selectedChips = props.selectedValues ?
                props.selectableValues
                    .filter((item) => {return props.selectedValues.includes(item.name);})
                    .map((item) => {return item.value})
                : [];

        this.state.unselectedChips = props.selectedValues ?
            props.selectableValues
                .filter((item) => {return !props.selectedValues.includes(item.name);})
                .map((item) => {return item.value})
            : props.selectableValues;
    }

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

export default ChipSelector;
