import React, { Component } from "react";
// import "./NavigationBar.css";
// import NavigationBar from "./NavigationBar";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import Footer from "../Footer/Footer";
import NavBar from "../LandingPage/NavBar";

export default class Home extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <br />
        <br />
        <br/>
        <div class="Search">
          <SearchBar />
        </div>

        <div>
          <Cards />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}