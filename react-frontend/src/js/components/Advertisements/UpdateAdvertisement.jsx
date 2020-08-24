import React from 'react'; 
import NavBar from "../../../js/components/LandingPage/NavBar";
import Footer from "../../../js/components/Footer/Footer";
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { FormInput, FormRadioGroup,
    FormTextArea, FormFloatingNumericTextBox, FormDropDownList, FormUpload } from '../PostAdvertisement/form-components';
import { propertyType, propertyLocation,petFriendly, leaseType } from "../PostAdvertisement/data/data";
import { adTitleValidator, requiredValidator, propertyDescValidator, propertyRentAmountValidator
    ,contactTimingValidator,streetAddressValidator, zipCodeValidator   } from '../PostAdvertisement/validators';
import img from "../../../assets/images/house.jpg";
import { MDBTypography } from "mdbreact";
import { Link } from "react-router-dom";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";
import { Button } from "react-bootstrap";
import { storage } from "../../../../src/index"; 
import axios from "axios"; 
import "../../../css/components/advertisements/UpdateAdvertisement.css"

const defaultItem = "Select Property Type";
const defaultItemLocation = "Select Location";
const firebaseUrl = "https://firebasestorage.googleapis.com/v0/b/rentickly.appspot.com/o/advertisements";

class UpdateAdvertisement extends React.Component {

    state = {
        aid: this.props.location.myCustomProps.aId,
        userId: this.props.location.myCustomProps.userId,
        adTitle: this.props.location.myCustomProps.adTitle,
        address: this.props.location.myCustomProps.propertyAddress,
        desc: this.props.location.myCustomProps.propertyDescription,
        location: this.props.location.myCustomProps.propertyLocation,
        rentAmount: this.props.location.myCustomProps.rentAmount,
        type: this.props.location.myCustomProps.propertyType,
        leaseType: this.props.location.myCustomProps.leaseType,
        petfriendly:this.props.location.myCustomProps.petFriendly,
        zipcode: this.props.location.myCustomProps.zipCode,
        contactTiming: this.props.location.myCustomProps.contactTiming
    }
    componentDidMount() {
        console.log(this.props.location.myCustomProps);
    }

    handleSubmit = (values) => {
        console.log(values); 
        const adObject = values;
        // alert(JSON.stringify(dataItem, null, 2));
        const imageUrls = [] 
        if(values['propertyDocument'] !== undefined){
            for(let i=0; i < values['propertyDocument'].length;i++) {
                imageUrls.push(firebaseUrl + "%2F" + adObject.email + "%2F" + values['propertyDocument'][i].name + "?alt=media" )
                this.handleUpload(values['propertyDocument'][i].getRawFile(),values['propertyDocument'][i].name,adObject.email, adObject.adTitle)    
            }
        }
        adObject.userId = this.state.userId; 
        adObject.aId = this.state.aid; 
        adObject.imageUrls = imageUrls;
        console.log(imageUrls);
        console.log("Before Post Request: ", adObject); 
        axios.post(`/updateAd/${this.state.aid}`, adObject)
            .then(res => {
                console.log(res); 
            })
            .catch(err => {
                console.log(err); 
            })
            alert("Advertisement updated successfully");
        this.props.history.push("/myAds")
    }

    handleUpload(image, imageName, email, adTitle) {
        const uploadTask = storage.ref(`advertisements/${email}/${adTitle}/${imageName}`).put(image)
        uploadTask.on('state_changed',
        function(snapshot) {
        //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //   console.log('Upload is ' + progress + '% done')
        },
        function error(err) {
          console.log('error', err)
        },
        function complete() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log(downloadURL); 
          })
        }
      )
    }

    render() {
        return (
            <div className="mt-5">
                <div style={{ backgroundImage: `url(${img})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no - repeat",
                        backgroundSize: "cover",
                    }}>
                    <NavBar/>
                    <MDBContainer style={{ marginLeft: '0'}}>
                    <MDBBreadcrumb>
                        <Link to="/"><MDBBreadcrumbItem>Home&nbsp;/</MDBBreadcrumbItem></Link>
                        <Link to="/myAds"><MDBBreadcrumbItem>&nbsp;My Advertisements&nbsp;/</MDBBreadcrumbItem></Link>
                        <MDBBreadcrumbItem active>&nbsp;View Advertisement</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                    </MDBContainer>
                    <div style={{  marginLeft: '30%', marginRight: '10%' }}>

                        <Form initialValues={{
                                    adTitle: this.state.adTitle,
                                    propertyType: this.state.type,
                                    propertyDescription: this.state.desc,
                                    petFriendly: this.state.petFriendly === 0 ? 'yes': 'no',
                                    leaseType: this.state.leaseType === 0 ? 'longTerm': 'shortTerm',
                                    streetAddress: this.state.address,
                                    propertyLocation: this.state.location,
                                    rentAmount: this.state.rentAmount,
                                    propertyZipCode: this.state.zipcode,
                                    contactTiming: this.state.contactTiming
                            }}  
                        onSubmit={this.handleSubmit} render={(formRenderProps) => (

                        <FormElement style={{ maxWidth: 650, background: '#f2f2f2', borderRadius: '10px' }}>
                            <fieldset style={{ margin: '2%'}} className={'k-form-fieldset'}>
                                {/* <legend className={'k-form-legend'}>Please fill in the fields:</legend> */}
                                <div className="mb-3">
                                    <Field
                                        key={'adTitle'}
                                        id={'adTitle'}
                                        name={'adTitle'}
                                        label={'Ad Title'}
                                        defaultItem="hello"
                                        component={FormInput}
                                        validator={adTitleValidator}
                                    />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        key={'propertyType'}
                                        id={'propertyType'}
                                        name={'propertyType'}
                                        label={'propertyType'}
                                        defaultItem={defaultItem}
                                        data={propertyType}
                                        component={FormDropDownList}
                                    />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        key={'propertyDescription'}
                                        id={'propertyDescription'}
                                        name={'propertyDescription'}
                                        label={'Property Description'}
                                        validator={propertyDescValidator}
                                        component={FormTextArea}
                                    />
                                </div>

                                <div className="mb-3">
                                    <Field
                                        key={'rentAmount'}
                                        id={'rentAmount'}
                                        name={'rentAmount'}
                                        label={'Rent Amount'}
                                        validator={propertyRentAmountValidator}
                                        component={FormFloatingNumericTextBox }
                                    />
                                </div>
                            
                                <div className="mb-3">
                                <Field
                                        key={'petFriendly'}
                                        id={'petFriendly'}
                                        name={'petFriendly'}
                                        label={'Pet Friendly'}
                                        layout={'horizontal'}
                                        component={FormRadioGroup}
                                        data={petFriendly}
                                        validator={requiredValidator}
                                    />
                                </div>

                                <div className="mb-3">
                                    <Field
                                            key={'leaseType'}
                                            id={'leaseType'}
                                            name={'leaseType'}
                                            label={'Lease Type'}
                                            layout={'horizontal'}
                                            component={FormRadioGroup}
                                            data={leaseType}
                                            validator={requiredValidator}
                                        />
                                </div>
                            <div className="mb-3">
                            <Field
                                    key={'streetAddress'}
                                    id={'streetAddress'}
                                    name={'streetAddress'}
                                    label={'Street Address'}
                                    component={FormInput}
                                    validator={streetAddressValidator}
                                />
                            </div>
                            <div className="mb-3">
                                <Field
                                        key={'propertyLocation'}
                                        id={'propertyLocation'}
                                        name={'propertyLocation'}
                                        label={'Property Location'}
                                        defaultItem={defaultItemLocation}
                                        data={propertyLocation}
                                        component={FormDropDownList}
                                    />
                            </div>
                            <div className="mb-3">
                                <Field
                                    key={'propertyZipCode'}
                                    id={'propertyZipCode'}
                                    name={'propertyZipCode'}
                                    label={'Zip Code'}
                                    component={FormInput}
                                    validator={zipCodeValidator}
                                />
                            </div>

                            <div className="mb-3">
                                <Field
                                    key={'propertyDocument'}
                                    id={'propertyDocument'}
                                    name={'propertyDocument'}
                                    label={'Add more upload images'}
                                    optional={true}
                                    multiple={true}
                                    hint={'Hint: Upload your property Images'}
                                    component={FormUpload}
                                />
                            </div>
                            <div className="mb-3">
                                <Field
                                    key={'contactTiming'}
                                    id={'contactTiming'}
                                    name={'contactTiming'}
                                    label={'Contact Timing'}
                                    component={FormInput}
                                    validator={contactTimingValidator}
                                    />
                            </div>

                            </fieldset>
                            <div style={{ marginLeft: '35%', marginRight: '30%' }} className="k-form-buttons">
                                <Button
                                    variant="primary"
                                    style={{  marginBottom: '10px' }}
                                    type={'submit'}
                                    className="k-button"
                                >
                                    Update Ad
                                </Button>
                            </div>
                            </FormElement>
                        )}
                        />         
                        </div>
                        <Footer />   
                </div>                   
            </div>
        )
    }
}

export default UpdateAdvertisement; 