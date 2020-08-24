// Author- Arthy Umapathy
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import NavBar from "../LandingPage/NavBar";
import { MDBBtn } from "mdbreact";
import axios from "axios";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor() {
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);
    super();
    this.state = {
      username: decoded.identity.username,
      email: decoded.identity.email,
      newname: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.getLoginData = this.getLoginData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChangeonreset = this.handleChangeonreset.bind(this);
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleChange = (e) => {
    e.preventDefault();
    var validuser = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
    if ((this.state.newname.length > 2) & validuser.test(this.state.newname)) {
      axios
        .post("/users/update", {
          email: this.state.email,
          username: this.state.newname
            ? this.state.newname
            : this.state.username,
        })
        .then((res) => {
          localStorage.removeItem("access_token");
          localStorage.setItem("access_token", JSON.stringify(res.data));
          alert("Profile Updated");
          this.props.history.push(`/Profile`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert(
        "Enter valid username.  Fullname with first name and last name seperated by space and atleast of length 3 each "
      );
    }
  };
  handleChangeonreset = (e) => {
    e.preventDefault();
    console.log("newname" + this.state.newname);
    axios
      .post("/users/update", {
        email: this.state.email,
        username: this.state.newname ? this.state.newname : this.state.username,
      })
      .then((res) => {
        // localStorage.removeItem("access_token");
        this.props.history.push(`/ResetPassword`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getLoginData = (value, type) =>
    this.setState({
      [type]: value,
    });

  render() {
    return (
      <div className="container">
        <NavBar />
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">UPDATE</h1>
          </div>
          <form noValidate onSubmit={this.handleChange}>
            <table className="table col-md-6 mx-auto">
              <tbody>
                <tr>
                  <td>Email id</td>
                  <td>{this.state.email}</td>
                </tr>
                <tr>
                  <td>User Name</td>
                  <td>
                    <input
                      type="text"
                      name="newname"
                      placeholder={this.state.username}
                      onChange={this.onChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Password</td>
                  <td>
                    <Link
                      className="blue-text ml-1"
                      onClick={this.handleChangeonreset}
                    >
                      reset password
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>

            <MDBBtn
              type="submit"
              gradient="blue"
              className="btn-block z-depth-1a white-text font-weight-bold"
              onClick={this.onSubmit}
            >
              Update
            </MDBBtn>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
