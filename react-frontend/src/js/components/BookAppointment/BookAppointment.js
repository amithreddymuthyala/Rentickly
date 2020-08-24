//Author: Amith Reddy Muthyala
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../../../css/components/BookAppointment/BookAppointment.css";
import NavBar from "../../../js/components/LandingPage/NavBar";
import Footer from "../../../js/components/Footer/Footer";
import jwt_decode from "jwt-decode";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const nameRegex = RegExp(/^[A-Z][-'a-zA-Z\s]{2,16}$/);

const formValid = (
  formErrors,
  firstName,
  lastName,
  email,
  appointmentDate,
  myTime
) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });
  if (
    firstName === null ||
    lastName === null ||
    email === null ||
    appointmentDate == null ||
    myTime == null
  ) {
    valid = false;
  }
  return valid;
};

class BookAppointment extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.access_token;
    const decoded = jwt_decode(token);

    this.state = {
      userId: decoded.identity.userid,
      firstName: null,
      aId: this.props.location.data.aid,
      lastName: null,
      email: null,
      redirect: false,
      appointmentDate: null,
      myTime: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        myTime: "",
        appointmentDate: "",
      },
    };
  }

  onKeyPress(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      alert("Only alphabets are allowed");
      event.preventDefault();
    }
  }

  noSpace(event) {
    if (event.charCode === 32) {
      alert("Cannot insert spaces");
      event.preventDefault();
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let aId = this.state.aId; 
    console.log(aId);

    if (
      formValid(
        this.state.formErrors,
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.appointmentDate,
        this.state.myTime
      )
    ) {
      console.log(`
        --Submitting--
        First Name : ${this.state.firstName}
        Last Name : ${this.state.lastName}
        Email : ${this.state.email}
        Date : ${this.state.appointmentDate}
        Time : ${this.state.myTime}
        `);

        // Adding appointments to database
        fetch("/addappointment/" + aId, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.state),
        })
          .then(() => {
            this.setState({ redirect: true });
            console.log("redirect" + this.state.redirect);
          })
          .catch(function () {
            console.log("error");
          });
      // this.setState({
      //   redirect: true,
      // });
      alert("Appointment application submitted successfully");
      this.props.history.push('/');
    } else {
      alert("Enter valid details. Appointment schedule failed");
      console.error(` Form Invalid `);
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName = nameRegex.test(value)
          ? ""
          : "Enter a valid name. 1)First letter of the name should be capital. 2)Should not contain numbers. 3)Name should not start with space";
        break;
      case "lastName":
        formErrors.lastName = nameRegex.test(value)
          ? ""
          : "Enter a valid name. 1)First letter of the name should be capital. 2)Should not contain numbers. 3)Name should not start with space";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address. Enter valid email like: am23@gmail.com";
        break;
      case "appointmentDate":
        var today = new Date();
        formErrors.appointmentDate =
          value.split("-")[0] < today.getFullYear() ||
          value.split("-")[1] < today.getMonth() ||
          value.split("-")[2] < today.getDate()
            ? "Please input a valid date"
            : "";
        break;
      case "myTime":
        formErrors.myTime =
          value.split(":")[0] < 9 || value.split(":")[0] > 17
            ? "Please note that working hours are 9:00 am to 6:00 pm"
            : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  clearAll = () => {
    this.setState({
      firstName: null,
      lastName: null,
      email: null,
      appointmentDate: null,
      myTime: null,
      redirect: false,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        appointmentDate: "",
        myTime: "",
      },
    });
    document.getElementById("registration-form").reset();
  };

  render() {
    const { formErrors } = this.state;
    const redirect = this.state.redirect;

    // if (redirect === true) {
    //   return <Redirect to="/SignIn" />;
    // }

    return (
      <div>
        <NavBar />

        <div className="wrapper">
          <div className="form-wrapper">
            <h1>Appointment Form</h1>
            <form
              id="registration-form"
              onSubmit={this.handleSubmit}
              noValidate
            >
              <div className="firstName">
                <label htmlFor="firstName">First Name</label>
                <input
                  className={formErrors.firstName.length > 0 ? "error" : null}
                  placeholder="First Name"
                  type="text"
                  onKeyPress={(event) => this.onKeyPress(event)}
                  name="firstName"
                  maxLength="16"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.firstName.length > 0 && (
                  <span className="errorMessage">{formErrors.firstName}</span>
                )}
              </div>
              <div className="lastName">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className={formErrors.lastName.length > 0 ? "error" : null}
                  placeholder="Last Name"
                  type="text"
                  onKeyPress={(event) => this.onKeyPress(event)}
                  name="lastName"
                  maxLength="16"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.lastName.length > 0 && (
                  <span className="errorMessage">{formErrors.lastName}</span>
                )}
              </div>
              <div className="email">
                <label htmlFor="email">Email</label>
                <input
                  className={formErrors.email.length > 0 ? "error" : null}
                  placeholder="Email"
                  type="email"
                  onKeyPress={(event) => this.noSpace(event)}
                  name="email"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.email.length > 0 && (
                  <span className="errorMessage">{formErrors.email}</span>
                )}
              </div>
              <div className="date">
                <label htmlFor="date">Appointment Date</label>
                <input
                  placeholder="Date"
                  type="date"
                  name="appointmentDate"
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.appointmentDate.length > 0 && (
                  <span className="errorMessage">
                    {formErrors.appointmentDate}
                  </span>
                )}
              </div>
              <div className="myTime">
                <label htmlFor="myTime">Preferred Time</label>
                <input
                  className={formErrors.myTime.length > 0 ? "error" : null}
                  placeholder="myTime"
                  type="time"
                  name="myTime"
                  multiple
                  noValidate
                  onChange={this.handleChange}
                />
                {formErrors.myTime.length > 0 && (
                  <span className="errorMessage">{formErrors.myTime}</span>
                )}
              </div>
              <div className="submitApplication">
                <button type="submit">Submit Application</button>
                <button
                  type="button"
                  name="clearAll"
                  value="cancel"
                  onClick={this.clearAll}
                >
                  Clear All
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default BookAppointment;
