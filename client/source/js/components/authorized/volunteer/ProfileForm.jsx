/**
 * A profile-form component.
 * A form that wraps different form components
 * and passes the state on to the wrapper component.
 */


// Imports ------------------------------------------------------------------------------------------------------------
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import SkillPicker from '../SkillPicker.jsx';

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Returns a Form-component with no state that can display the error state of the parent-object.
 * @param onSubmit {function} what to do when the form is submitted.
 * @param onChange {function} what to do when a form-component within the form is changed.
 * @param errors {Object} the error state of the parent object.
 * @param profile {Object} the already saved profile.
 */
const ProfileForm = ({
    onSubmit,
    onChange,
    errors,
    profile,
}) => (
    <form className="profile-form" action="/volunteer/profile" method="POST" onSubmit={onSubmit}>
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
            <SkillPicker
                name="skills"
                onChange={onChange}
                values={profile.skills}
                hintText="select your skills"
            />
        </div>

        <div className="button-line">
            <RaisedButton type="submit" label="Save" primary />
        </div>

    </form>
);

// Exports ------------------------------------------------------------------------------------------------------------
export default ProfileForm;
