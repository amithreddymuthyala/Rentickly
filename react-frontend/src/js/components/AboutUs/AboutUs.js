// Author- Arthy Umapathy
import React, { Fragment } from "react";
import NavBar from "../../../js/components/LandingPage/NavBar";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import img from "../../../assets/images/about.jpg";
import Footer from "../../../js/components/Footer/Footer";

function AboutUs(props) {
  return (
    <Fragment>
      <NavBar />
      <Fragment>
        <header
          className="jumbotron  text-center"
          style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: "center",
            backgroundRepeat: "no - repeat",
            backgroundSize: "cover",
          }}
        ></header>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Arthy Umapathy"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Master's Degree</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Nova Scotia,Canada
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              ligula in erat facilisis fermentum. Maecenas a ex elementum eros
              blandit faucibus.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="Amith Reddy"
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Master's Degree</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Nova Scotia,Canada
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              ligula in erat facilisis fermentum. Maecenas a ex elementum eros
              blandit faucibus.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Siddharth Anikar"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Master's Degree</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Nova Scotia,Canada
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              ligula in erat facilisis fermentum. Maecenas a ex elementum eros
              blandit faucibus.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Romal"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Master's Degree</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Nova Scotia,Canada
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              ligula in erat facilisis fermentum. Maecenas a ex elementum eros
              blandit faucibus.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Sharan"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Master's Degree</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Nova Scotia,Canada
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              ligula in erat facilisis fermentum. Maecenas a ex elementum eros
              blandit faucibus.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="Riya"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Master's Degree</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Nova Scotia,Canada
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              ligula in erat facilisis fermentum. Maecenas a ex elementum eros
              blandit faucibus.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </Fragment>
      <Footer/>
    </Fragment>
  );
}
export default AboutUs;