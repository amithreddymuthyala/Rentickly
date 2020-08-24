//Author: Romal Sehgal
// References: https://www.telerik.com/kendo-react-ui/components/form/multi-step-form/

import React from 'react';
import { Field } from '@progress/kendo-react-form';
import { FormInput, FormDropDownList } from '../form-components';

import { streetAddressValidator, zipCodeValidator } from '../validators';

import { propertyLocation  } from "../data/data";

const defaultItemLocation = "Select Location";

// Property Details: 2nd step of advertisement form 
export const PropertyDetails = (
    <div>

    <Field
            key={'streetAddress'}
            id={'streetAddress'}
            name={'streetAddress'}
            label={'Street Address'}
            component={FormInput}
            validator={streetAddressValidator}
        />
         <Field
            key={'propertyLocation'}
            id={'propertyLocation'}
            name={'propertyLocation'}
            label={'Property Location'}
            defaultItem={defaultItemLocation}
            data={propertyLocation}
            component={FormDropDownList}
        />

        <Field
            key={'propertyZipCode'}
            id={'propertyZipCode'}
            name={'propertyZipCode'}
            label={'Zip Code'}
            component={FormInput}
            validator={zipCodeValidator}
        />

    </div>
);

export default PropertyDetails;
