import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import SkillPicker from '../SkillPicker.jsx';

const styles = {
    floatingLabelStyle: {
        textAlign: 'center'
    },
    inputStyle: {
        textAlign: 'center',
    }
};

const NeedsForm = ({
    onSubmit,
    onChange,
    errors,
    need,
}) => (
    <form className="need-form" action="/organization/needs" method="POST" onSubmit={onSubmit}>
        <h2>Need</h2>

        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
            <TextField
                floatingLabelText="title"
                name="title"
                errorText={errors.title}
                onChange={onChange}
                value={need.title}
                floatingLabelStyle={styles.floatingLabelStyle}
                inputStyle={styles.inputStyle}
            />
        </div>

        <div className="field-line">
            <TextField
                floatingLabelText="description"
                name="description"
                errorText={errors.description}
                onChange={onChange}
                value={need.description}
                floatingLabelStyle={styles.floatingLabelStyle}
                inputStyle={styles.inputStyle}
            />
        </div>

        <div className="field-line">
            <SkillPicker
                onChange={onChange}
                values={need.skills}
                hintText="select the skills you need"
            />
        </div>

        <div className="button-line">
            <RaisedButton type="submit" label="Save" secondary />
        </div>

    </form>
);

export default NeedsForm;