/**
 * A profile-form component.
 * A form that wraps different form components
 * and passes the state on to the wrapper component.
 */


// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import DropDownSelector from '../DropDownSelector.jsx';

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
            <DropDownSelector
                name="location"
                onChange={onChange}
                multiple={true}
                selectableValues={selectables.location}
                selectedValues={profile.location}
                errorText={errors.location}
                hintText="where do you want to volunteer?"
            />
        </div>

        <div className="field-line">
            <DropDownSelector
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
            <DropDownSelector
                name="timePerOccasion"
                onChange={onChange}
                multiple={false}
                selectableValues={selectables.timePerOccasion}
                selectedValues={profile.timePerOccasion}
                errorText={errors.timePerOccasion}
                hintText="how much time in one go?"
            />
        </div>

        <div className="field-line">
            <DropDownSelector
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
            <DropDownSelector
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
            <TextField
                multiLine={true}
                rows={3}
                rowsMax={10}
                floatingLabelText="describe yourself"
                floatingLabelFixed={true}
                floatingLabelStyle={styles.alignLeft}
                style={styles.alignLeft}
                name="description"
                errorText={errors.description}
                onChange={onChange}
                value={profile.description}
            />
        </div>

        <div className="field-line">
            <TextField
                floatingLabelText="email"
                floatingLabelFixed={true}
                name="email"
                errorText={errors.email}
                onChange={onChange}
                value={profile.email}
            />
        </div>

        <div className="button-line">
            <RaisedButton type="submit" label="Save" disabled={!isComplete} primary />
        </div>

    </form>
);

// Exports ------------------------------------------------------------------------------------------------------------
export default ProfileForm;
