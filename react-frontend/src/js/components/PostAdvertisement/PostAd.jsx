//Author: Romal Sehgal
// References: https://www.telerik.com/kendo-react-ui/components/form/multi-step-form/

import React, { useEffect } from 'react';
import { Form, FormElement } from '@progress/kendo-react-form';
import { Button } from '@progress/kendo-react-buttons';
import { Stepper } from '@progress/kendo-react-layout';
import { Link, useHistory } from "react-router-dom";
import  AdDetails from "./Steps/AdDetails";
import  PropertyDetails  from './Steps/PropertyDetails';
import OtherDetails from './Steps/OtherDetails';
import axios from "axios"; 
import { storage } from "../../../../src/index"; 
import NavBar from "../../../js/components/LandingPage/NavBar";
import "../../../css/components/PostAdvertisement/PostAd.css"
import img from "../../../assets/images/house.jpg";
import jwt_decode from "jwt-decode";
import Footer from "../../../js/components/Footer/Footer";

const firebaseUrl = "https://firebasestorage.googleapis.com/v0/b/rentickly.appspot.com/o/advertisements"

const stepPages = [ 
    AdDetails, 
    PropertyDetails, 
    OtherDetails 
];

function PostAdvertisement() {
    const [step, setStep] = React.useState(0);
    const [formState, setFormState] = React.useState({});
    const [aId, setId] = React.useState(null); 
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);
    
    const [steps, setSteps] = React.useState([
        { label: 'Ad Details', isValid: undefined },
        { label: 'Property Details', isValid: undefined },
        { label: 'Other Details', isValid: undefined }
    ]);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get("http://localhost:5000/getLastAdId")
            setId(response.data);
        }
        getData()
      }, []);

    function handleUpload(image, imageName, aId) {
        const uploadTask = storage.ref(`advertisements/${decoded.identity.userid}/${aId}/${imageName}`).put(image)
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

    const history = useHistory();
    function redirectHome() {
        history.push("/");
      }

    function getEmailId() {
         return localStorage.getItem('email');  
    }
    

    const lastStepIndex = steps.length - 1;
    const isLastStep = lastStepIndex === step;

    const onStepSubmit = React.useCallback(
        (event) => {
            const { isValid, values } = event;

            const currentSteps = steps.map((currentStep, index) => ({
                ...currentStep,
                isValid: index === step ? isValid : currentStep.isValid
            }));

            setSteps(currentSteps);

            if (!isValid) {
                return;
            }

            setStep(() => Math.min(step + 1, lastStepIndex));
            setFormState(values);

            if (isLastStep) {
                alert(JSON.stringify(values));
                console.log(values, JSON.stringify(values)); 
                const adObject = values;
                adObject.applicationStatus = "submitted"
                adObject.email = getEmailId() 
                const imageUrls = [] 
                if(values['propertyDocument'] !== undefined){
                    for(let i=0; i < values['propertyDocument'].length;i++) {
                        imageUrls.push(firebaseUrl + "%2F" + decoded.identity.userid + "%2F" +  (aId['aId'] + 1)  + "%2F" + values['propertyDocument'][i].name + "?alt=media" )
                        handleUpload(values['propertyDocument'][i].getRawFile(),values['propertyDocument'][i].name,aId['aId'] + 1)
                    
                    }
                    adObject.imageUrls = imageUrls
                }
                console.log(imageUrls);
                console.log("Before Post Request: ", adObject); 
                axios.post("http://localhost:5000/postAd/post", adObject)
                    .then(res => {
                        console.log(res); 
                    })
                    .catch(err => {
                        console.log(err); 
                    })
                alert("Advertisement submitted successfully");
                redirectHome()
            }
        },
        [step, steps, setSteps, setStep, setFormState, isLastStep]
    );

    const onPrevClick = React.useCallback(
        (event) => {
            event.preventDefault();
            setStep(() => Math.max(step - 1, 0));
        },
        [step, setStep]
    );

    return (
        <div style={{   backgroundImage: `url(${img})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no - repeat",
                        backgroundSize: "cover",
                    }}>
            <NavBar />
                <div style={{    display: 'flex', marginTop: '50px', flexDirection: 'column', justifyContent: 'center' }}>
                <Stepper value={step} items={steps} />
                <Form 
                    initialValues={formState}
                    onSubmitClick={onStepSubmit}
                    render={(formRenderProps) => (
                        <div style={{ background:'#f2f2f2', borderWidth: '0.5px', alignSelf: 'center', margin: '20px', borderRadius: '10px' }}>
                            <FormElement style={{ margin: '15px',  width: 480 }}>
                                {stepPages[step]}
                                <span style={{ marginTop: '40px' }} className={'k-form-separator'} />
                                <div
                                    style={{ border: '2px',  justifyContent: 'space-between', alignContent: 'center' }}
                                    className={'k-form-buttons k-buttons-end'}
                                >
                                    <span style={{ color: '#4242A5', alignSelf: 'center' }}>Step {step + 1} of 3</span>
                                    <div>
                                        {
                                            step !== 0 ? (
                                                <Button style={{ marginRight: '16px' }} onClick={onPrevClick}>
                                                    Previous
                                                </Button>
                                            ) : undefined
                                        }
                                        <Link to="/">
                                            <Button
                                                primary={true}
                                                disabled={!formRenderProps.allowSubmit}
                                                onClick={formRenderProps.onSubmit}
                                            >
                                                {isLastStep ? 'Submit' : 'Next'}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </FormElement>
                        </div>
                    )}
                />
            </div>
            <Footer />
        </div>
      
    );
};

export default PostAdvertisement;