// Author- Arthy Umapathy
import React, { useState, Fragment } from "react";
import { Drawer, IconButton, Divider, Menu } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "../../../css/components/LandingPage/NavBar.css";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";

function NavBars() {
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("access_token");
    history.push({
      pathname: "/",
    });
  };

  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const loginRegLink = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/SignIn">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/SignUp">
          Register
        </Link>
      </li>
    </ul>
  );
  const userLink = (
    <ul className="navbar-nav" float="right">
      <li className="nav-item">
        <Link className="nav-link" to="/myAds">
          My Advertisements
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Profile">
          Profile
        </Link>
      </li>
      <li className="nav-item" float="right">
        <Link className="nav-link" to="" onClick={logOut}>
          Log out
        </Link>
      </li>
    </ul>
  );
  const adminLink = (
    <ul className="navbar-nav" float="right">
      <li className="nav-item">
        <Link className="nav-link" to="/AdminHelpResponse">
          Manage Help Response
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/admin/ads">
          Manage Ads
        </Link>
      </li>
      <li className="nav-item" float="right">
        <Link className="nav-link" to="" onClick={logOut}>
          Log out
        </Link>
      </li>
    </ul>
  );
  const AfterLogin = (
    <ul className="nav__main-items">
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/ViewAppointment">
          View Appointment
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/AppointmentsWithMe">
          Confirm Appointments requested
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/myapps">
          View My Rental Application
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/postAd">
          Post Ad
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/wishlist">
          Favourite
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/Todo">
          Todo
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/maps">
          View Ads on Maps
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/insights">
          Insights
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/Help">
          Help
        </Link>
      </li>
    </ul>
  );
  const dividerbefore = (
    <ul className="nav__main-items">
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/searchRoom">
          Search Rooms
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/SignIn">
          SignIn
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/SignUp">
          SignUp
        </Link>
      </li>
    </ul>
  );
  const dividerafter = (
    <ul className="nav__main-items">
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/AboutUs">
          AboutUs
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/Profile">
          Profile
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="" onClick={logOut}>
          Log out
        </Link>
      </li>
    </ul>
  );

  const BeforeLogin = (
    <ul className="nav__main-items">
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/AboutUs">
          About Us
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/Help">
          Help
        </Link>
      </li>
      <li className="nav__main-item">
        <Link className="nav__bar-link" to="/FAQs">
          FAQs
        </Link>
      </li>
    </ul>
  );
  const useStyles = makeStyles({
    root: {
      background: "linear-gradient(to left, #333399 0%, #0099cc 100%)",
      width: "250px",
      position: "fixed",
    },
    IconColor: {
      color: "#FFFFFF",
    },
    dividerColor: {
      background: "#FFFFFF",
      marginLeft: "40px",
      marginRight: "40px",
      height: "1px",
    },
    backArrowClass: {
      marginLeft: "-45px",
    },

    headingStyle: {
      marginTop: "8px",
      marginLeft: "0.2%",
    },

    toolBarHeight: {
      height: "64px",
    },
  });
  const classes = useStyles();
  return (
    <Fragment>
      <nav
        className="navbar navbar-expand-md bg-primary navbar-dark fixed-top"
        style={{
          background: "linear-gradient(to left, #333399 0%, #0099cc 100%)",
        }}
      >
        <IconButton
          classes={{ paper: classes.IconColor }}
          onClick={handleDrawer}
          edge="start"
          aria-label="menu"
        >
          <span className="navbar-toggler-icon"></span>
        </IconButton>
        <a href="/" className="navbar-brand">
          Rentickly
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
          aria-controls="collapsibleNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          {localStorage.access_token
            ? jwt_decode(localStorage.access_token).identity.email ===
              "admin@gmail.com"
              ? adminLink
              : userLink
            : loginRegLink}
        </div>
      </nav>
      <Drawer
        classes={{ paper: classes.root }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="nav__header">
          <IconButton
            classes={{ root: classes.backArrowClass }}
            onClick={handleDrawerClose}
            edge="start"
            aria-label="menu"
          >
            <ArrowBackIcon />
          </IconButton>
          <h4 className="nav__bar-title">Rentickly</h4>
        </div>
        <div className="nav__main">
          {localStorage.access_token
            ? jwt_decode(localStorage.access_token).identity.email ===
              "admin@gmail.com"
              ? BeforeLogin
              : AfterLogin
            : BeforeLogin}
        </div>
        <Divider classes={{ root: classes.dividerColor }} />
        <div className="nav__main">
          {localStorage.access_token ? dividerafter : dividerbefore}
        </div>
      </Drawer>
      <br />
      <br />
    </Fragment>
  );
}

export default NavBars;
