import React, { useState } from 'react'; 
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer } from "mdbreact"; 


const InsightsPanel = (props) => {
    return (<MDBContainer>
        <MDBCardGroup deck>
                <MDBCard  color="indigo" text="white" className="text-center">
                    <MDBCardBody>
                        Total Applications:{ props.panelData.result[0].totalApplications }
                    </MDBCardBody>
                </MDBCard>
                <MDBCard   color="red lighten-1" text="white" className="text-center">
                    <MDBCardBody>
                    Number of Locations: { props.panelData.result[1].numLocations  }
                    </MDBCardBody>
                </MDBCard>
                <MDBCard color="success-color" text="white" className="text-center">
                    <MDBCardBody>
                        Users Registered: { props.panelData.result[2].numUsers }
                    </MDBCardBody>
                </MDBCard>
            </MDBCardGroup>
    </MDBContainer> )
};
    
export default InsightsPanel;