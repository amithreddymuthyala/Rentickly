// Author- Arthy Umapathy
import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <MDBFooter className="text-center py-3 font-small pt-4 mt-4 fixed-bottom bg-primary" color="blue">
        <MDBContainer fluid>
          <Link to="/">Rentickly</Link>
        </MDBContainer>
      </MDBFooter>
    );
  }
}

export default Footer;
