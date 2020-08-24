//Author: Romal Sehgal
// References: https://www.telerik.com/kendo-react-ui/components/form/multi-step-form/
import React from 'react';

import { FieldWrapper } from '@progress/kendo-react-form';
import { Input, NumericTextBox, RadioGroup, Slider, SliderLabel
} from '@progress/kendo-react-inputs';
import { Label, Error, Hint, FloatingLabel } from '@progress/kendo-react-labels';
import { Upload } from '@progress/kendo-react-upload';
import { DropDownList, AutoComplete, MultiSelect, ComboBox } from '@progress/kendo-react-dropdowns';

export const FormInput = (  fieldRenderProps   ) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, type, optional, ...others } = fieldRenderProps;
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}</Label>
            <div className={'k-form-field-wrap'}>
                <Input
                    valid={valid}
                    type={type}
                    id={id}
                    disabled={disabled}
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    {...others}
                />
                {
                    showHint &&
                    <Hint id={hintId}>{hint}</Hint>
                }
                {
                    showValidationMessage &&
                    <Error id={errorId}>{validationMessage}</Error>
                }
            </div>
        </FieldWrapper>
    );
};

export const FormRadioGroup = (fieldRenderProps   ) => {
    const { validationMessage, touched, id, label, valid, disabled, hint, visited, modified, ...others } = fieldRenderProps;
    const editorRef = React.useRef(null);

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    return (
        <FieldWrapper>
            <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
            <RadioGroup
                id={id}
                ariaDescribedBy={`${hintId} ${errorId}`}
                ariaLabelledBy={labelId}
                valid={valid}
                disabled={disabled}
                ref={editorRef}
                {...others}
            />
            {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export const FormNumericTextBox = (   fieldRenderProps  ) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
            <NumericTextBox
                ariaDescribedBy={`${hintId} ${errorId}`}
                valid={valid}
                id={id}
                disabled={disabled}
                {...others}
            />
            {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export const FormTextArea = (  fieldRenderProps   ) => {
    const { validationMessage, touched, label, id, valid, hint, optional, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
            <textarea
                aria-describedby={`${hintId} ${errorId}`}
                className={'k-textarea k-autofill'}
                id={id}
                {...others}
            />
            {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export const FormSlider = (    fieldRenderProps    ) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, data, ...others } = fieldRenderProps;

    const editorRef = React.useRef(null);
    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    return (
        <FieldWrapper>
            <Label
                id={labelId}
                editorRef={editorRef}
                editorId={id}
                editorValid={valid}
                editorDisabled={disabled}
            >
                {label}
            </Label>
            <Slider
                ariaLabelledBy={labelId}
                ariaDescribedBy={`${hintId} ${errorId}`}
                ref={editorRef}
                valid={valid}
                id={id}
                disabled={disabled}
                {...others}
            >
                {
                    data.map(value => (
                        <SliderLabel
                            title={value}
                            key={value}
                            position={value}
                        />
                    ))
                }
            </Slider>
            {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export const FormUpload = (     fieldRenderProps    ) => {
    const { valid, value, id, optional, label, hint, validationMessage, touched, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    const onChangeHandler = (event) => {
        fieldRenderProps.onChange({ value: event.newState });
    };
    const onRemoveHandler = (event) => {
        fieldRenderProps.onChange({ value: event.newState });
    };

    return (
        <FieldWrapper>
            <Label id={labelId} editorId={id} editorValid={valid} optional={optional}>
                {label}
            </Label>
            <Upload
                id={id}
                valid={valid}
                autoUpload={false}
                showActionButtons={false}
                multiple={false}
                files={value}
                onAdd={onChangeHandler}
                onRemove={onRemoveHandler}
                ariaDescribedBy={`${hintId} ${errorId}`}
                ariaLabelledBy={labelId}
                {...others}
            />
            {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export const FormDropDownList = (   fieldRenderProps  ) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } = fieldRenderProps;
    const editorRef = React.useRef(null);

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label
                id={labelId}
                editorRef={editorRef}
                editorId={id}
                editorValid={valid}
                editorDisabled={disabled}
            >
                {label}
            </Label>
            <DropDownList
                ariaLabelledBy={labelId}
                ariaDescribedBy={`${hintId} ${errorId}`}
                ref={editorRef}
                valid={valid}
                id={id}
                disabled={disabled}
                {...others}
            />
            {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export const FormComboBox = (     fieldRenderProps     ) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } = fieldRenderProps;
    const editorRef = React.useRef(null);

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
                {label}
            </Label>
            <ComboBox
                ariaLabelledBy={labelId}
                ariaDescribedBy={`${hintId} ${errorId}`}
                ref={editorRef}
                valid={valid}
                id={id}
                disabled={disabled}
                {...others}
            />
            {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};

export const FormMultiSelect = (   fieldRenderProps   ) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, wrapperStyle, ...others } = fieldRenderProps;
    const editorRef = React.useRef(null);

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';
    const labelId = label ? `${id}_label` : '';

    return (
        <FieldWrapper style={wrapperStyle}>
            <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
                {label}
            </Label>
            <MultiSelect
                ariaLabelledBy={labelId}
                ariaDescribedBy={`${hintId} ${errorId}`}
                ref={editorRef}
                valid={valid}
                id={id}
                disabled={disabled}
                {...others}
            />
            {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};


export const FormFloatingNumericTextBox = (fieldRenderProps) => {
    const { validationMessage, touched, label, id, valid, disabled, hint, optional, value, ...others } = fieldRenderProps;

    const showValidationMessage = touched && validationMessage;
    const showHint = !showValidationMessage && hint;
    const hintId = showHint ? `${id}_hint` : '';
    const errorId = showValidationMessage ? `${id}_error` : '';

    return (
        <FieldWrapper>
            <FloatingLabel
                optional={optional}
                editorValue={value}
                editorId={id}
                editorValid={valid}
                editorDisabled={disabled}
                label={label}
            >
                <NumericTextBox
                    ariaDescribedBy={`${hintId} ${errorId}`}
                    value={value}
                    format="c"
                    valid={valid}
                    id={id}
                    disabled={disabled}
                    {...others}
                />
            </FloatingLabel>
            {
                showHint &&
                <Hint id={hintId}>{hint}</Hint>
            }
            {
                showValidationMessage &&
                <Error id={errorId}>{validationMessage}</Error>
            }
        </FieldWrapper>
    );
};
