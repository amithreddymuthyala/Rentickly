// Author- Arthy Umapathy
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import NavBar from "../LandingPage/NavBar";
import { Button } from "react-bootstrap";
import axios from "axios";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      errors: {},
    };
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  delete = (e) => {
    e.preventDefault();
    axios
      .post("/users/delete", {
        email: this.state.email,
      })
      .then((res) => {
        localStorage.removeItem("access_token");
        this.props.history.push(`/SignUp`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  update() {
    this.props.history.push(`/Update`);
  }
  componentDidMount() {
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.identity.username,
      email: decoded.identity.email,
    });
  }
  render() {
    return (
      <div className="container">
        <NavBar />
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>User Name</td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td>Email id</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
          <Button className="float-right" onClick={this.update}>
            Update
          </Button>
          <Button className="float-right" onClick={this.delete}>
            Deactivate
          </Button>
        </div>
      </div>
    );
  }
}

export default Profile;
