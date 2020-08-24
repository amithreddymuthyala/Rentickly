// Author- Arthy Umapathy
import React, { Component } from "react";
import NavBar from "./NavBar";
import Header from "./Header";

class LandingPage extends Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <NavBar />
        <Header />
      </div>
    );
  }
}
export default LandingPage;
