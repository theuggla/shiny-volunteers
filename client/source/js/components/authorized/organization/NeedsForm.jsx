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

import SkillPicker from '../SkillPicker.jsx';

// Variables ----------------------------------------------------------------------------------------------------------
let requiredSkillsHint = "select the skills you require";


// CLass --------------------------------------------------------------------------------------------------------------

/**
 * Returns a Form-component with no state that can display the error state of the parent-object.
 * @param onSubmit {function} what to do when the form is submitted.
 * @param onChange {function} what to do when a form-component within the form is changed.
 * @param errors {Object} the error state of the parent object.
 * @param need {Object} the need-object to update..
 */
const NeedsForm = ({
    onSubmit,
    onChange,
    errors,
    need,
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
                errorText={errors.description}
                onChange={onChange}
                value={need.description}
                floatingLabelStyle={styles.centerText}
                inputStyle={styles.centerText}
            />
        </div>

        <div className="field-line">
            <SkillPicker
                onChange={onChange}
                name="skillsNeeded"
                values={need.skillsNeeded}
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
