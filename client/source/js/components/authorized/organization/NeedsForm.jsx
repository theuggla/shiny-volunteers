/**
 * A need-form component.
 * A form that wraps different form components
 * and passes the state on to the wrapper component.
 */

// Imports -----------------------------------------------------------------------------------------------------------
import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Card from 'material-ui/Card';

import styles from '../../../ReactStyles';

import DropDownSelector from '../DropDownSelector.jsx';
import ChipSelector from '../ChipSelector.jsx';

// Variables ----------------------------------------------------------------------------------------------------------
let requiredSkillsHint = "select the skills you require";

// Class --------------------------------------------------------------------------------------------------------------

/**
 * Returns a Form-component with no state that can display the error state of the parent-object.
 * @param onSubmit {function} what to do when the form is submitted.
 * @param onChange {function} what to do when a form-component within the form is changed.
 * @param errors {Object} the error state of the parent object.
 * @param need {Object} the need-object to update.
 * @param isComplete {boolean} whether the form is complete.
 * @param selectables {Object} an object with the arrays to select from under the different categories.
 */
const NeedsForm = ({
    onSubmit,
    onChange,
    errors,
    need,
    selectables,
    isComplete
}) => (
    <form className="need-form" action="/organization/needs" method="POST" onSubmit={onSubmit}>
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="field-line">
            <Card style={styles.formCard}>
                <TextField
                    floatingLabelText="title"
                    name="title"
                    hintText="what do you need help with?"
                    floatingLabelStyle={styles.formTextField.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.formTextField.floatingLabelFocusStyle}
                    style={styles.formTextField.style}
                    inputStyle={styles.formTextField.inputStyle}
                    errorText={errors.title}
                    onChange={onChange}
                    value={need.title}
                />
            </Card>
        </div>

        <div className="field-line">
            <Card style={styles.formCard}>
            <DropDownSelector
                name="location"
                onChange={onChange}
                multiple={true}
                selectableValues={selectables.location}
                selectedValues={need.location}
                errorText={errors.location}
                hintText="where do you need help?"
            />
            </Card>
        </div>

        <div className="field-line">
            <ChipSelector
                name="numberOfTimes"
                onChange={onChange}
                multiple={false}
                selectableValues={selectables.numberOfTimes}
                selectedValues={need.numberOfTimes}
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
                    selectedValues={need.timePerOccasion}
                    errorText={errors.timePerOccasion}
                    hintText="maximum time in one go?"
                />
            </Card>
        </div>

        <div className="field-line">
            <Card>
            <TextField
                multiLine={true}
                rows={2}
                floatingLabelText="when do you need the help?"
                hintText="Tuesday afternoons, March 21, every morning, weekends..."
                name="when"
                floatingLabelStyle={styles.formTextField.floatingLabelStyle}
                floatingLabelFocusStyle={styles.formTextField.floatingLabelFocusStyle}
                style={styles.formTextField.style}
                inputStyle={styles.formTextField.inputStyle}
                errorText={errors.when}
                onChange={onChange}
                value={need.when}
            />
            </Card>
        </div>

        <div className="field-line">
            <ChipSelector
                onChange={onChange}
                hintText="what skills are essential?"
                name="skillsRequired"
                multi={true}
                selectableValues={selectables.skillsRequired}
                selectedValues={need.skillsRequired}
            />
        </div>

        <div className="field-line">
            <ChipSelector
                onChange={onChange}
                hintText="what skills are more optional?"
                name="skillsDesired"
                multi={true}
                selectableValues={selectables.skillsDesired}
                selectedValues={need.skillsDesired}
            />
        </div>

        <div className="field-line">
            <ChipSelector
                onChange={onChange}
                name="categories"
                multi={true}
                selectableValues={selectables.categories}
                selectedValues={need.categories}
                hintText="what categories does this need fall into?"
            />
        </div>

        <div className="field-line">
            <Card style={styles.formCard}>
                <TextField
                    multiLine={true}
                    rows={3}
                    rowsMax={10}
                    floatingLabelText="describe your need"
                    floatingLabelStyle={styles.formTextField.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.formTextField.floatingLabelFocusStyle}
                    style={styles.formTextField.style}
                    inputStyle={styles.formTextField.inputStyle}
                    textareaStyle={styles.formTextField.textareaStyle}
                    name="description"
                    errorText={errors.description}
                    onChange={onChange}
                    value={need.description}
                />
            </Card>
        </div>

        <div className="field-line">
            <Card style={styles.formCard}>
                <DatePicker
                    floatingLabelText="how long to save the need for?"
                    floatingLabelStyle={styles.formTextField.floatingLabelStyle}
                    floatingLabelShrinkStyle={styles.addNeedForm.shrunkenDatePicker}
                    autoOk={true}
                    minDate={new Date()}
                    maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate())}
                    underlineShow={false}
                    textFieldStyle={styles.centerText}
                    inputStyle={styles.centerText}
                    disableYearSelection={true}
                    value={need.expiryDate}
                    onChange={(event, date) => {onChange({target: {name: 'expiryDate', value: new Date(date)}})}}
                />
            </Card>
        </div>

        <div className="field-line">
            <Card>
                <TextField
                    floatingLabelText="way of contact (email or telephone)"
                    name="contact"
                    floatingLabelStyle={styles.formTextField.floatingLabelStyle}
                    floatingLabelFocusStyle={styles.formTextField.floatingLabelFocusStyle}
                    style={styles.formTextField.style}
                    inputStyle={styles.formTextField.inputStyle}
                    errorText={errors.contact}
                    onChange={onChange}
                    value={need.contact}
                />
            </Card>
        </div>

        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div className="button-line">
            <RaisedButton type="submit" label="Save" disabled={!isComplete} primary />
        </div>
    </form>
);

// Exports ------------------------------------------------------------------------------------------------------------
export default NeedsForm;
