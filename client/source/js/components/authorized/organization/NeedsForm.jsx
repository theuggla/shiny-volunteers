import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import SkillPicker from '../SkillPicker.jsx';

const NeedsForm = ({
    onSubmit,
    onChange,
    errors,
    need,
}) => (
    <form className="need-form" action="/organization/needs/add" method="POST" onSubmit={onSubmit}>
        <h2>Need</h2>

        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
            <SkillPicker
                onChange={onChange}
                values={need.skills}
                hintText="select the skills you need"
            />
        </div>

        <div className="field-line">
        </div>

        <div className="button-line">
            <RaisedButton type="submit" label="Save" secondary />
        </div>

    </form>
);

export default NeedsForm;
