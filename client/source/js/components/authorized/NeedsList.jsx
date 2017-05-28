/**
 * Component to display provided needs in a table.
 * Does not save state.
 */

// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import {Table, TableBody} from 'material-ui/Table';

import styles from '../../ReactStyles';

import Need from './NeedDisplay.jsx';

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Component that displays a table of needs or a text, if no needs are provided.
 * If the needs are marked as being an action-need, an icon will be shown to initiate the action
 * and a confirm-window will appear to ask the user to confirm the action with the provided prompt.
 *
 * @param needs {[Object]} the needs to display.
 * @param noNeedsText {String} the text to display if there are no needs.
 * @param action {boolean} whether to show an action button for the need.
 * @param actionPrompt {string} what action to propt the user to take.
 * @param onClick {function} the action to take when the button is clicked.
 * @param icon {Component} the icon-component to use for the action button.
 * @param confirmPrompt {String} the text to show when the user is asked to conform the action.
 * @param errors {Object} the error state of the wrapping component.
 */
const NeedsList = ({needs, noNeedsText, onClick, action, actionPrompt, icon, confirmPrompt, errors}) => (
        <div className="needs-list">
            {errors.summary && <p style={styles.error}>{errors.summary}</p>}

            {(needs.length === 0) && <p style={styles.needsDisplay.noNeeds}>{noNeedsText}</p> }

            {(needs.length > 0) && (
                <div>
                    <p style={styles.needsDisplay.actionTip}>{actionPrompt}</p>
                    <Table style={styles.needsDisplay.needsList}>
                        <TableBody
                            selectable={false}
                            showRowHover={true}
                            stripedRows={true}
                            displayRowCheckbox={false}
                        >
                            {needs.map( (need) => (
                                <Need onClick={onClick} need={need} action={action} icon={icon} confirmPrompt={confirmPrompt} key={need._id}/>
                            ))}
                            </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );

// Exports ------------------------------------------------------------------------------------------------------------
export default NeedsList;
