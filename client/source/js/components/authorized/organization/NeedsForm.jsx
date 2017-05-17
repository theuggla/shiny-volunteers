/**
 * A need-form component.
 * A form that wraps different form components
 * and passes the state on to the wrapper component.
 */

// Imports -----------------------------------------------------------------------------------------------------------
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import styles from '../../../ReactStyles';

import DropDownSelector from '../DropDownSelector.jsx';

// Variables ----------------------------------------------------------------------------------------------------------
let requiredSkillsHint = "select the skills you require";

// CLass --------------------------------------------------------------------------------------------------------------

/**
 * Returns a Form-component with no state that can display the error state of the parent-object.
 * @param onSubmit {function} what to do when the form is submitted.
 * @param onChange {function} what to do when a form-component within the form is changed.
 * @param errors {Object} the error state of the parent object.
 * @param need {Object} the need-object to update.
 * @param selectables {Object} an object with the arrays to select from under the different categories.
 */
const NeedsForm = ({
    onSubmit,
    onChange,
    errors,
    need,
    selectables
}) => (
    <form className="need-form" action="/organization/needs" method="POST" onSubmit={onSubmit}>
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
            <TextField
                floatingLabelText="title"
                name="title"
                errorText={errors.title}
                onChange={onChange}
                value={need.title}
                floatingLabelStyle={styles.centerText}
                inputStyle={styles.centerText}
            />
        </div>

        <div className="field-line">
            <TextField
                floatingLabelText="description"
                name="description"
                multiLine={true}
                errorText={errors.description}
                onChange={onChange}
                value={need.description}
                style={styles.addNeedForm.descriptionArea}
            />
        </div>

        <div className="field-line">
            <DropDownSelector
                onChange={onChange}
                name="skillsNeeded"
                multi={true}
                selectableValues={selectables.skillsNeeded}
                selectedValues={need.skillsNeeded}
                hintText={requiredSkillsHint}
            />
        </div>

        <div className="button-line">
            <RaisedButton type="submit" label="Save" primary />
        </div>
    </form>
);

// Exports ------------------------------------------------------------------------------------------------------------
export default NeedsForm;
