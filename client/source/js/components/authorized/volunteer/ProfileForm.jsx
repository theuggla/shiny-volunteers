/**
 * A profile-form component.
 * A form that wraps different form components
 * and passes the state on to the wrapper component.
 */


// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';

import DropDownSelector from '../DropDownSelector.jsx';
import ChipSelector from '../ChipSelector.jsx';

import styles from '../../../ReactStyles';

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Returns a Form-component with no state that can display the error state of the parent-object.
 * @param onSubmit {function} what to do when the form is submitted.
 * @param onChange {function} what to do when a form-component within the form is changed.
 * @param errors {Object} the error state of the parent object.
 * @param profile {Object} the already saved profile.
 * @param selectables {Object} an object with the arrays to select from under the different categories.
 * @param isComplete{Boolean} wrapper state to indicate whether the form is complete.
 */
const ProfileForm = ({
    onSubmit,
    onChange,
    errors,
    profile,
    selectables,
    isComplete
}) => (
    <form className="profile-form" action="/volunteer/profile" method="POST" onSubmit={onSubmit}>
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
            <Card style={styles.formCard}>
            <DropDownSelector
                name="location"
                multiple={true}
                onChange={onChange}
                selectableValues={selectables.location}
                selectedValues={profile.location}
                errorText={errors.location}
                hintText="where to volunteer?"
            />
            </Card>
        </div>

        <div className="field-line">
            <ChipSelector
                name="numberOfTimes"
                onChange={onChange}
                multiple={false}
                selectableValues={selectables.numberOfTimes}
                selectedValues={profile.numberOfTimes}
                errorText={errors.numberOfTimes}
                hintText="how often?"
            />
        </div>

        <div className="field-line">
            <Card style={styles.formCard}>
            <DropDownSelector
                name="timePerOccasion"
                onChange={onChange}
                multiple={false}
                selectableValues={selectables.timePerOccasion}
                selectedValues={profile.timePerOccasion}
                errorText={errors.timePerOccasion}
                hintText="maximum time in one go?"
            />
            </Card>
        </div>

        <div className="field-line">
            <ChipSelector
                name="interests"
                onChange={onChange}
                multiple={true}
                selectableValues={selectables.interests}
                selectedValues={profile.interests}
                errorText={errors.interests}
                hintText="what areas are you interested in?"
            />
        </div>

        <div className="field-line">
            <ChipSelector
                name="skills"
                onChange={onChange}
                multiple={true}
                selectableValues={selectables.skills}
                selectedValues={profile.skills}
                errorText={errors.skills}
                hintText="what skills do you have?"
            />
        </div>

        <div className="field-line">
            <Card style={styles.formCard}>
            <TextField
                multiLine={true}
                rows={3}
                rowsMax={10}
                floatingLabelText="describe yourself"
                floatingLabelStyle={styles.formTextField.floatingLabelStyle}
                floatingLabelFocusStyle={styles.formTextField.floatingLabelFocusStyle}
                floatingLabelShrinkStyle={styles.formTextField.floatingLabelFocusStyle}
                underlineShow={false}
                style={styles.formTextField.style}
                inputStyle={styles.formTextField.inputStyle}
                textareaStyle={styles.formTextField.textareaStyle}
                name="description"
                errorText={errors.description}
                onChange={onChange}
                value={profile.description}
            />
            </Card>
        </div>

        <div className="field-line">
            <Card style={styles.formCard}>
            <TextField
                floatingLabelText="email"
                name="email"
                floatingLabelStyle={styles.formTextField.floatingLabelStyle}
                floatingLabelFocusStyle={styles.formTextField.floatingLabelFocusStyle}
                floatingLabelShrinkStyle={styles.formTextField.floatingLabelFocusStyle}
                underlineShow={false}
                style={styles.formTextField.style}
                inputStyle={styles.formTextField.inputStyle}
                errorText={errors.email}
                onChange={onChange}
                value={profile.email}
            />
            </Card>
        </div>

        <div className="button-line">
            <RaisedButton type="submit" label="Save" disabled={!isComplete} primary />
        </div>

    </form>
);

// Exports ------------------------------------------------------------------------------------------------------------
export default ProfileForm;
