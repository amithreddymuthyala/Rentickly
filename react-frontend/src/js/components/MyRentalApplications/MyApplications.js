// Author: Siddharth Anikar
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";
import Footer from "../../components/Footer/Footer";
import jwt_decode from "jwt-decode";
import Loader from "react-loader-spinner";

export default class MyApplications extends Component {
  constructor(props) {
    super(props);
  
    // token to obtain logged in user
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);

    this.state = {
      userId: decoded.identity.userid,
      loading: false,
      items: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const url = "/myapplications";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ loading: false, items: data });
  }

  render() {
    const { loading } = this.state;
    return (  
      <div>
        <NavBar />

        <div>
        {loading ? (
          <Loader type="ThreeDots" color="#1d8ba6" height="100" width="100" />
        ) : (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email </th>
                <th>Phone </th>
                <th>Date of Birth </th>
                <th>Employment Status </th>
                <th>Current Employer </th>
                <th>Monthly Income </th>
                <th>File Uploaded </th>
              </tr>
            </thead>
            <tbody>
              {this.state.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.dob}</td>
                  <td>{item.status}</td>
                  <td>{item.employer}</td>
                  <td>{item.income}</td>
                  <td>{item.files}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
        <Footer />
      </div>
    );
  }
}