import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import SkillPicker from './SkillPicker.jsx';

const ProfileForm = ({
    onSubmit,
    onChange,
    errors,
    profile,
}) => (
    <form className="profile-form" action="/volunteer/profile" method="POST" onSubmit={onSubmit}>
        <h2>My Profile</h2>

        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
            <SkillPicker
                onChange={onChange}
                values={profile.skills}
                hintText="select your skills"
            />
        </div>

        <div className="field-line">
        </div>

        <div className="button-line">
            <RaisedButton type="submit" label="Save" secondary />
        </div>

    </form>
);

export default ProfileForm;
