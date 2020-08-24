import React from 'react'; 
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const Graphs = (props) => {
    const averageRentGraphOptions = {
        title: {
            text: "Average Rent by City for all Property Types"
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Average Rent (CAD)'
            }
        },
        legend: {
            enabled: true
        },
        series: [{
            name: 'City',
            data: [
                [ 'Toronto', props.averageRentGraphData.result.Toronto  ],
                [ 'Halifax', props.averageRentGraphData.result.Halifax  ],
                [ 'Calgary', props.averageRentGraphData.result.Calgary  ],
                [ 'Vancouver', props.averageRentGraphData.result.Vancouver  ],
            ],
    }],
    credits: {
        enabled: false
    } 
    }
    const propertyTypeGraphOptions = {
        title: {
            text: "Rental Applications by Property Type"
        },
        chart: {
            type: 'column'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Applications'
            }
        },
        legend: {
            enabled: true
        },
        series: [{
            name: 'PropertyType',
            data: [
                [ 'House', props.propertyRentGraphData.result.House  ],
                [ 'Condo', props.propertyRentGraphData.result.Condo  ],
                [ 'Apartment', props.propertyRentGraphData.result.Apartment  ],
                [ 'Room', props.propertyRentGraphData.result.Room  ],
            ],
        }],
        credits: {
            enabled: false
        } 
    }
    return (
        <div style={{ marginTop:'50px'}}>
            <MDBContainer>
                <MDBRow>
                    <MDBCol size="6">
                    <HighchartsReact
                            highcharts={Highcharts}
                            options={averageRentGraphOptions}
                            />
                    </MDBCol>
                    <MDBCol size="6">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={propertyTypeGraphOptions}
                            />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default Graphs;