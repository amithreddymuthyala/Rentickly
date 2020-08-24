//Author: Romal Sehgal
// References: https://www.telerik.com/kendo-react-ui/components/form/multi-step-form/
import React from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormInput, FormMaskedTextBox, FormDateInput, FormUpload } from '../form-components';
import {  contactTimingValidator  } from '../validators';

// Other Details: 3rd Step of Advertisement form 
export const OtherDetails = (
    <div>
        <Field
            key={'propertyDocument'}
            id={'propertyDocument'}
            name={'propertyDocument'}
            label={'Add any Additional Attchments'}
            optional={true}
            multiple={true}
            hint={'Hint: Upload your property Images'}
            component={FormUpload}
        />
        
        <Field
            key={'contactTiming'}
            id={'contactTiming'}
            name={'contactTiming'}
            label={'Contact Timing'}
            component={FormInput}
            validator={contactTimingValidator}
        />
    </div>
);

export default OtherDetails;
