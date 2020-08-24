import React, { Component } from "react";
import { ListGroup, Card, Col, Row, Container } from "react-bootstrap";
import img1 from "../../../assets/images/house-logo.jpg";

export default class View extends Component {
  render() {
    return (
      <ListGroup.Item>
        <Container>
          <Row>
            <Col md={4}>
              <Card style={{ width: "35rem", height: "15rem" }}>
                <Card.Img src={img1}></Card.Img>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "60rem" }}>
                <Card.Body>
                  <Card.Title>
                    <Row sm>
                      <Col
                        style={{
                          marginLeft: "2rem",
                          textAlign: "left",
                          fontFamily: "Times New Roman",
                          fontSize: "11pt",
                          fontWeight: "bold",
                        }}
                      >
                        Room available for rent
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Subtitle
                    style={{
                      marginLeft: "2rem",
                      textAlign: "left",
                      fontFamily: "Times New Roman",
                      fontSize: "11pt",
                      fontWeight: "bold",
                    }}
                  >
                    $XXX
                  </Card.Subtitle>
                  <Card.Text
                    style={{
                      width: "50rem",
                      textAlign: "left",
                      fontFamily: "Times New Roman",
                      fontSize: "10pt",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ligula in erat facilisis fermentum. Maecenas a ex
                    elementum eros blandit faucibus. Phasellus convallis elit ac
                    tortor tincidunt, nec sollicitudin felis interdum.
                    Vestibulum feugiat tellus et leo lobortis, a maximus ante
                    elementum. Nulla non mi semper, aliquet lectus at, porta
                    urna. Pellentesque pretium varius ipsum, eu congue tortor
                    consequat at. Praesent ac metus eu libero ultricies
                    hendrerit.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    );
  }
}