import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';
import InsightsPanel from "./Panel";
import Graphs from "./graphs"; 
import NavBar from "../../../js/components/LandingPage/NavBar";
import Footer from "../../../js/components/Footer/Footer";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import styled from '@react-pdf/styled-components';

const Heading = styled.Text`
  margin: 10px;
  font-size: 22px;
  text-align: center;
  font-family: 'Helvetica';
`;


const Description = styled.Text`
    text-align: center; 
    font-size: 15px;
    margin: 10px;  
`

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  view: {
    width: '100%',
    height: '100%',
    padding: 0,
    backgroundColor: 'white',
    textAlign: 'center'
},
  imgeAvgRent: {
    width: '100%',
    marginLeft: '5%',
    marginRight: '2%',
    height: '50%',
    textAlign: 'center'
}
});
 
// Create Document Component
const ViewPdf = () => (
        [<NavBar />,
          <br></br>,<br></br>,
        <MDBContainer style={{ marginLeft: '0'}}>
          <MDBBreadcrumb>
            <Link to="/"><MDBBreadcrumbItem>Home&nbsp;/</MDBBreadcrumbItem></Link>
            <Link to="/insights"><MDBBreadcrumbItem>&nbsp;Insights&nbsp;/</MDBBreadcrumbItem></Link>
            <MDBBreadcrumbItem active>&nbsp;View Pdf</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBContainer>,
        <PDFViewer>
            <Document>
                <Page size="A4" style={styles.page}>
                  <View style={styles.view}>
                    <Heading>
                      Rental Report
                    </Heading>
                      <Image src={{uri:"/plotAvgRent.png", method: 'GET', headers:{'Access-Control-Allow-Origin': '*'}}} style={styles.imgeAvgRent}></Image>
                      <Description>
                        The above graph indicates the average rent throughout the Canada for all property types whether its Condo, Rooom, Apartment, or House. This would give an idea to the individual who is looking for a place and based on such information they can decide to go for specific property type when taking decision.  
                      </Description>
                  </View>
                </Page>
                <Page size="A4" style={styles.page}>
                  <View style={styles.view}>
                      <Image src={{uri:"/plotPropType.png", method: 'GET', headers:{'Access-Control-Allow-Origin': '*'}}} style={styles.imgeAvgRent}></Image>
                      <Description>
                        The above graph indicates the total rentalApplications by property Type. This shows how much the individuals are submitting the applications for a specific property type. Based on such information, renters can get an idea about the property type demand as of today.
                      </Description>
                  </View>
                </Page>
            </Document>
        </PDFViewer>,
        <Footer />]
);

// ReactDOM.render(<ViewPdf />, document.getElementById('root'));
export default ViewPdf;