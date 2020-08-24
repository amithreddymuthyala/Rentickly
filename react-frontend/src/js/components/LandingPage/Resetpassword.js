// Author- Arthy Umapathy
import React, { Fragment } from "react";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import NavBar from "./NavBar";
import Fade from "react-reveal/Fade";
import axios from "axios";

class Resetpassword extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      newpwd: "",
      confirmpwd: "",
      security: "",
      valid: false,
    };
    this.getLoginData = this.getLoginData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getLoginData = (value, type) =>
    this.setState({
      [type]: value,
    });
  onSubmit(e) {
    e.preventDefault();
    this.onFormSubmit(e);
    if (this.state.valid) {
      axios
        .post("/users/resetpwd", {
          email: this.state.email,
          newpwd: this.state.newpwd,
          security: this.state.security,
        })
        .then((res) => {
          if (res.data["result"] !== "") {
            alert("Reset Successfull");
            this.props.history.push(`/SignIn`);
          } else {
            alert("No records found");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.props.history.push(`/Resetpassword`);
    }
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const validEmailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const { email, newpwd, confirmpwd, security } = this.state;
    if (!validEmailRegex.test(email)) {
      alert("Type a valid email id");
    } else if (newpwd < 5) {
      alert("Password should be of atleast 5 characters length");
    } else if (newpwd !== confirmpwd) {
      alert("Passwords don't match");
    } else if (security.length < 1) {
      alert("Enter Security answer to reset password");
    } else {
      this.setState({ valid: true });
    }
  };

  render() {
    return (
      <Fragment>
        <NavBar />
        <br />
        <Fade left>
          <MDBContainer>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol md="6">
                <MDBCard>
                  <div className="header pt-3 blue-gradient">
                    <MDBRow className="d-flex justify-content-center">
                      <h3 className="white-text mb-3 pt-3 font-weight-bold">
                        Resetpassword
                      </h3>
                    </MDBRow>
                  </div>
                  <MDBCardBody>
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="grey-text">
                        <MDBInput
                          label="Type your email"
                          icon="envelope"
                          group
                          type="text"
                          validate
                          getValue={(value) =>
                            this.getLoginData(value, "email")
                          }
                        />
                        <MDBInput
                          label="What is your favourite school teacher name?"
                          icon="lock"
                          group
                          type="text"
                          validate
                          getValue={(value) =>
                            this.getLoginData(value, "security")
                          }
                        />
                        <MDBInput
                          label="Type new password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          getValue={(value) =>
                            this.getLoginData(value, "newpwd")
                          }
                        />
                        <MDBInput
                          label="Confirm password"
                          icon="lock"
                          group
                          type="password"
                          validate
                          getValue={(value) =>
                            this.getLoginData(value, "confirmpwd")
                          }
                        />
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn
                          type="submit"
                          gradient="blue"
                          className="btn-block z-depth-1a white-text font-weight-bold"
                          onClick={this.onSubmit}
                        >
                          Reset
                        </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <br />
        </Fade>
      </Fragment>
    );
  }
}
export default Resetpassword;
