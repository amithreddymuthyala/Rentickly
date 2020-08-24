//Author: Amith Reddy Muthyala
import React, { Component, Fragment } from "react";
import NavBar from "../../../js/components/LandingPage/NavBar";
import Fade from "react-reveal/Fade";
import img from "../../../assets/images/contact.jpg";
import Footer from "../../../js/components/Footer/Footer";
import {
  MDBContainer,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdbreact";

class Help extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      message: "",
      email: "",
      subject: "Feedback",
      redirect: false,
    };
  }

  getLoginData = (value, type) =>
    this.setState({
      [type]: value,
    });

    handleChange = (event) => {
      // console.log("message" + event.target.message.value);
      const { name, value } = event.target;
      this.setState({ [name]: value }, () => console.log(this.state));
    };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { userName, email, message, subject} = this.state;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    if (userName.length <= 1) {
      alert("Type a valid username");
    } else if (!validEmailRegex.test(email)) {
      alert("Type a valid emailid");
    } else {
      // Adding message to database
      console.log("username" + this.state.userName);
      console.log("email" + this.state.email);
      console.log("message" + this.state.message);
      console.log("subject" + this.state.subject);

      // Api call to register complaint
      fetch("/registercomplaint", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.state),
      })
        .then(() => {
          this.setState({ redirect: true });
          console.log("redirect" + this.state.redirect);
          this.props.history.push('/');
        })
        .catch(function () {
          console.log("error");
        });
      alert("Successfully logged in your complaint/request");
    }
  };
  render() {
    return (
      <div>
        <div
          style={{
            backgroundImage: `url(${img})`,
            height: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no - repeat",
            backgroundSize: "cover",
            display: "block",
          }}
        >
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
                          Contact Us
                        </h3>
                      </MDBRow>
                    </div>
                    <MDBCardBody>
                      <div className="card-body px-md-8 pt-10 ">
                        <form
                          className="text-center"
                          onSubmit={this.onFormSubmit}
                        >
                          <div className="md-form mt-3">
                            <MDBInput
                              type="text"
                              label="Name"
                              name="userName"
                              id="materialContactFormName"
                              className="form-control"
                              getValue={(value) =>
                                this.getLoginData(value, "userName")
                              }
                            />
                          </div>

                          <div className="md-form">
                            <MDBInput
                              type="email"
                              label="E-mail"
                              name="email"
                              id="materialContactFormEmail"
                              className="form-control"
                              getValue={(value) =>
                                this.getLoginData(value, "email")
                              }
                            />
                          </div>

                          <span>Subject</span>
                          <select name= "subject" id="subject" className="mdb-select" onChange={this.handleChange}>
                            <option value="Feedback" >Feedback</option>
                            <option value="BugReport">Report a bug</option>
                            <option value="FeatureRequest">Feature request</option>
                          </select>

                          <div className="md-form">
                            <textarea
                              id="materialContactFormMessage"
                              placeholder="Message"
                              name="message"
                              className="form-control md-textarea"
                              rows="3"
                              onChange={this.handleChange}
                            ></textarea>
                          </div>

                          <MDBBtn
                            type="button"
                            gradient="blue"
                            className="btn-block z-depth-1a white-text font-weight-bold"
                            onClick={this.onFormSubmit}
                          >
                            Send
                          </MDBBtn>
                        </form>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <br />
            <br />
          </Fade>
        </div>
        <Footer />
      </div>
    );
  }
}
export default Help;
