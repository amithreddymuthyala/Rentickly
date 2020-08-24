import React, { Component } from 'react'; 
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup } from "mdbreact"; 
import InsightsPanel from "./Panel";
import Graphs from "./graphs"; 
import Footer from "../Footer/Footer";
import NavBar from "../LandingPage/NavBar";
import axios from "axios";
import { Link } from "react-router-dom"; 
import { Button } from "react-bootstrap"; 

class Insights extends Component {

    constructor(props){
        super(props)
        this.state = {
            panelData: [],
            averageRentGraphData: [],
            propertyType: [],
            myCustomProps: null
        }
    }

    async componentDidMount() {
         axios.get("/getPanelInsights")
            .then(response => {
                this.setState({
                    panelData: response.data
                })
            })
            .catch(err => {
                console.log(err); 
        })
        
         axios.get("/getAverageRent")
            .then(response => {
                this.setState({ 
                    averageRentGraphData: response.data  
                })
            })
            .catch(err => {
                console.log(err); 
            })

         axios.get("/getApplicationsBypropType")
            .then(res => {
                this.setState({
                    propertyType: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
        
    }

    render() {
        const { panelData, averageRentGraphData, propertyType } = this.state; 
        let displayPanel = null;
        let displayGraph = null;
        let linkToPdf = null; 
        
        if(averageRentGraphData.length !== 0 && propertyType.length !== 0 && panelData.length !== 0){
            displayPanel = <InsightsPanel panelData={panelData} />
            displayGraph = <Graphs averageRentGraphData={averageRentGraphData} propertyRentGraphData={propertyType} />
        }
        if(averageRentGraphData.length !== 0 && propertyType.length !== 0 && panelData.length !== 0){
             linkToPdf = <div style={{ textAlign: 'center'}}>
                                <Link to="/viewPdf">
                                    <Button>
                                        View Rental Report
                                    </Button>
                                </Link>
                            </div>    
        }
        return (
            <div className="mt-5">
                <NavBar />
                <MDBContainer style={{ marginLeft: '0'}}>
                    <MDBBreadcrumb>
                        <Link to="/"><MDBBreadcrumbItem>Home&nbsp;/&nbsp;</MDBBreadcrumbItem></Link>
                        <MDBBreadcrumbItem active>Insights</MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                </MDBContainer>
                <div style={{ marginTop: '50px' }} >
                    { displayPanel }
                    { displayGraph }
                </div>
                { linkToPdf }
                <Footer />
            </div>
        );
    }
}

export default Insights; 