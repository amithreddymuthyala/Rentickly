// Author- Arthy Umapathy
import React, { Fragment } from "react";
import NavBar from "../../../js/components/LandingPage/NavBar";
import FAQsData from "./FAQsData";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";
import FAQ from "./FAQ";
import Jump from "react-reveal/Jump";
// import Footer from "../Footer/Footer"
import img from "../../../assets/images/faq.jpg";

function FAQContainer() {
  const faq = FAQsData.map((item) => <FAQ key={item.id} faq={item} />);
  return (
    <Fragment>
      <NavBar />
      <header
        className="jumbotron text-center"
        style={{
          marginBottom: 0,
        }}
      >
        <Jump>
          <h1 style={{ fontFamily: "Lucida Console" }}> FAQs </h1>
        </Jump>
        <p>Have more questions? Feel free to contact us.</p>
        <Link to="/Help">
          <MDBBtn
            type="button"
            gradient="blue"
            rounded
            className="btn-block z-depth-1a"
          >
            Contact Us
          </MDBBtn>
        </Link>
      </header>
      {faq}
      {/* <Footer/> */}
    </Fragment>
  );
}
export default FAQContainer;