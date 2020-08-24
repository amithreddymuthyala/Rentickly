// Author- Arthy Umapathy
import React from "react";
import NavBar from "../LandingPage/NavBar";
import Fade from "react-reveal/Fade";
import Accordion from "react-bootstrap/Accordion";
import { Card, Button } from "react-bootstrap";
function FAQ(props) {
  return (
    <div>
      <br />
      <div className="container">
        <Fade left>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header
                style={{
                  background:
                    "linear-gradient(to bottom, #33ccff 0%, #3399ff 86%)",
                }}
              >
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  {props.faq.questions}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>{props.faq.answers}</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Fade>
      </div>
    </div>
  );
}

export default FAQ;