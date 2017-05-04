import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class ConfirmDialog extends React.Component {
    state = {
        open: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.props.open) {
            if (nextProps.open) {
                this.handleOpen();
            } else {
                this.handleClose();
            }
        }
    }

    constructor(props) {
        super(props);
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleConfirm = () => {
        this.handleClose();
        this.props.onConfirm();
    };

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
                >
                    {this.props.text}
                </Dialog>
        );
    }
}

export default ConfirmDialog;
