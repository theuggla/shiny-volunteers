/**
 * A component for the display of a singe need.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import {TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import CollapseIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ExpandIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

import styles from '../../ReactStyles';

import ConfirmDialog from '../ConfirmDialog.jsx';

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Displays a single need.
 * Keeps state to know if the need is
 * expanded or not in the list and if the confirm prompt is open.
 */
class Need extends React.Component {

    /**
     * Passes on props, sets initial state and binds functions..
     * @param props {Object} will be passed on.
     */
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            confirmOpen: false
        };

        this.expandIcon = <ExpandIcon />;

        this.onConfirm = this.onConfirm.bind(this);
    }

    /**
     * Called when the action is confirmed on the need.
     * Passes the id of the need on to the provided onConfirm-function.
     */
    onConfirm() {
        this.props.onClick(this.props.need._id);
    }

    /**
     * Toggles the expand-icon and state of the need.
     */
    toggleExpand() {
        let open = !(this.state.open);
        this.setState({open: open});
        this.expandIcon = this.state.open ? <ExpandIcon /> : <CollapseIcon />;
    }

    /**
     * Displays the need.
     * @returns {Component} the need displayed as an expandable TableRow component
     * with or without an action-button.
     */
    render() {
        return (
            <TableRow key={this.props.need._id} selectable={false} style={styles.needsDisplay.needDisplayRow}>
                        <TableRowColumn style={styles.needsDisplay.needActionDisplayColumn}>
                            <IconButton
                                style={styles.needsDisplay.needActionIcon}
                                onTouchTap={() => {
                                if (this.props.action) {
                                    this.setState({confirmOpen: true})
                                }}}
                                >
                                {this.props.icon}
                            </IconButton>
                        </TableRowColumn>
                        <TableRowColumn key={this.props.need._id} style={styles.needsDisplay.needDisplayColumn}>
                            <h3>{this.props.need.title}</h3>
                            {(this.state.open) &&
                            (<div>
                                <div style={styles.needsDisplay.keyInfo}>
                                    <p><b>Required skills:</b> {this.props.need.skillsRequired.join(' - ')}</p>
                                    <p><b>Desired skills:</b> {this.props.need.skillsDesired.join(' - ')}</p>
                                    <p><b>When:</b> {this.props.need.when}</p>
                                    <p><b>Number of times:</b> {this.props.need.numberOfTimes.join(' / ')}</p>
                                    <p><b>Time per occasion:</b> {this.props.need.timePerOccasion}h</p>
                                    <p><b>Contact for more information:</b> {this.props.need.contact}</p>
                                </div>
                            <p>{this.props.need.description}</p>
                            </div>)
                            }
                        </TableRowColumn>
                        <TableRowColumn style={styles.needsDisplay.needActionDisplayColumn}>
                            <IconButton style={styles.needsDisplay.needActionIcon} onTouchTap={() => {
                                this.toggleExpand();}} >
                                {this.expandIcon}
                            </IconButton>
                        </TableRowColumn>
                {this.props.action && <ConfirmDialog onConfirm={this.onConfirm} open={this.state.confirmOpen} text={this.props.confirmPrompt}/>}
            </TableRow>
        )
    }
}

// Exports ------------------------------------------------------------------------------------------------------------
export default Need;
