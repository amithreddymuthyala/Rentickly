// Author - Romal Sehgal
import React from 'react';
import { getter } from '@progress/kendo-react-common';


const zipCodeRegex = new RegExp(/^[a-zA-Z][0-9][a-zA-Z]\s?[0-9][a-zA-Z][0-9]$/);


export const nameValidator = (value) => !value ?
            "Full Name is required" :
            value.length < 7 ? "Full Name should be at least 7 characters long." : "";

export const streetAddressValidator = (value) => !value ?
    "Street Address can't be left empty": ""; 
            
export const adTitleValidator = (value) => !value ?
            "Ad Title is required" :
            value.length < 8 ? "Ad Title should be at least 3 characters long." : "";

export const zipCodeValidator = (value) => !value ?
            "Zip Code is required" :
            value.length < 6 || value.length > 6 ? "Zip Code must containe 6 characters only": 
                (zipCodeRegex.test(value)) ? "" :"Please enter a valid zip code"

export const propertyDescValidator = (value) => !value ? "Please enter the property Description" : "";

export const propertyRentAmountValidator = (value) => !value ? "Rent Amount can't be left empty": ""; 

export const contactTimingValidator = (value) => !value? "Contact Timing Field can't be left empty": ""; 


export const requiredValidator = (value) => value ? "" : "Error: This field is required.";