import React, { Component } from "react";
import NavBar from "../LandingPage/NavBar";
import Footer from "../../components/Footer/Footer";
import { Card, Table } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

import Loader from "react-loader-spinner";

export class Maps extends Component {
  constructor(props) {
    super(props);

    // token to obtain logged in user
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);

    this.state = {
      stores: [],
      loading: false,
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const url = "/storeLocation";
    const response = await fetch(url);
    const data = await response.json();

    this.setState({ loading: false, stores: data });
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={this.onMarkerClick}
          name={store.propertyAddress}
        />
      );
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <NavBar />
        <div
          style={{
            display: "flex",
            marginTop: "50px",
            marginBottom: "50px",
            flexDirection: "column",
          }}
        >
          {loading ? (
            <Loader type="ThreeDots" color="#1d8ba6" height="100" width="100" />
          ) : (
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Property Type</th>
                  <th>Property Address </th>
                  <th>Property Description </th>
                  <th>Rent </th>
                  <th>Property Location </th>
                </tr>
              </thead>

              <tbody>
                {this.state.stores.map((item, index) => (
                  <tr key={index}>
                    <td>{item.adTitle}</td>
                    <td>{item.propertyType}</td>
                    <td>{item.propertyAddress}</td>
                    <td>{item.propertyDescription}</td>
                    <td>{item.rentAmount}</td>
                    <td>{item.propertyLocation}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Card style={{ height: "28rem" }}>
            <Card.Body>
              <Map
                google={this.props.google}
                zoom={14}
                style={{ width: "98%", height: "25rem" }}
                className="overflow-auto"
                initialCenter={{ lat: 44.648618, lng: -63.5859487 }}
              >
                {this.displayMarkers()}
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                </InfoWindow>
              </Map>
            </Card.Body>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyA_em-xc2RW-31MoqE7vCWA2Dyv6ILjEiI",
})(Maps);
