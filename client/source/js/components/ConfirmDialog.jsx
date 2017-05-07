/**
 * A modal confirm-daalog that takes a passed in prompt
 * and an onConfirm function.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import styles from '../ReactStyles';

// Class -------------------------------------------------------------------------------------------------------------

/**
 * A Confirm Popup-dialog.
 */
class ConfirmDialog extends React.Component {

    /**
     * Sets state and passes on the props.
     * @param props {Object} the props to pass on.
     */
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    /**
     * Opens or closes the dialog depending
     * on the props recieved.
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.props.open) {
            if (nextProps.open) {
                this.handleOpen();
            } else {
                this.handleClose();
            }
        }
    }

    /**
     * Sets state to open.
     */
    handleOpen = () => {
        this.setState({open: true});
    };

    /**
     * Sets state to closed.
     */
    handleClose = () => {
        this.setState({open: false});
    };

    /**
     * Closes the dialog and
     * calles the passed in onConfirm-function.
     */
    handleConfirm = () => {
        this.handleClose();
        this.props.onConfirm();
    };

    /**
     * Renders a modal dialog with a
     * cancel and a confirm button, and the passed in prompt.
     * @returns {Component} the dialog.
     */
    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Confirm"
                primary={true}
                onTouchTap={this.handleConfirm}
            />,
        ];

        return (
                <Dialog
                    title="Confirm"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    style={styles.centerText}
                >
                    {this.props.text}
                </Dialog>
        );
    }
}

// Exports ------------------------------------------------------------------------------------------------------------
export default ConfirmDialog;
