import React from "react";
import "./card-style.css";
import { Link } from "react-router-dom";
import { MDBBtn } from "mdbreact";

const Card = (props) => {
  return (
    <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
      <div className="card text-center">
        <div className="overflow">
          <img src={props.imgsrc} alt="Image 1" className="card-img-top" />
        </div>
        <div className="card-body text-dark">
          <h4 className="card-title">{props.title}</h4>
          <p className="card-text text-secondary">Lorem ipsum</p>

          <Link to="/wishlist">
            <MDBBtn
              type="button"
              gradient="blue"
              rounded
              className="btn-block z-depth-1a"
            >
              View Details
            </MDBBtn>
          </Link>
          <br />
          <Link to="/Review">
            <MDBBtn
              type="button"
              gradient="blue"
              rounded
              className="btn-block z-depth-1a"
            >
              Review
            </MDBBtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;