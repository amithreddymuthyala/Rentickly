import React, { Component } from "react";
import { Card } from "react-bootstrap";

class ReviewCardDisplay extends Component {
  state = {
    username: this.props.username,
    headline: this.props.headline,
    desc: this.props.desc,
  };
  render() {
    const { username, headline, desc } = this.state;
    return (
      <div>
        <Card className="reviewCard">
          <Card.Header>Review by {username}:</Card.Header>
          <Card.Body>
            <Card.Title>{headline}</Card.Title>
            <Card.Text>{desc}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ReviewCardDisplay;
