// Author- Arthy Umapathy
import React from "react";

import { Card, CardDeck } from "react-bootstrap";
// import history from "../History";
// import { MDBBtn } from "mdbreact";
// import { Link } from "react-router-dom";

class Body extends React.Component {
  render() {
    return (
      <div>
        <main className=" card container-fluid p-3 my-3 ">
          <h2 className="subtitle">Rent or Lease</h2>
          <p className="intro">
            Rent or lease your property as you wish using Rentickly..
          </p>
          <div className="container">
            <CardDeck>
              <Card className="card p-3">
                <Card.Img
                  varient="bottom"
                  src="https://bsmedia.business-standard.com/_media/bs/img/article/2017-02/28/full/1488233817-4089.jpg"
                />
                <Card.Body>
                  <Card.Title>Do you want to lease your property?</Card.Title>

                  <Card.Text>
                    Post your property and promote your property as you wish..
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="card p-3">
                <Card.Img
                  varient="bottom"
                  src="https://purewows3.imgix.net/images/articles/2019_12/home_oragnizing_tips_400.png?auto=format,compress&cs=strip"
                />
                <Card.Body>
                  <Card.Title>Do you want to rent a property?</Card.Title>
                  <Card.Text>
                    Search for properties quickly and efficiently by filtering
                    or by viewing postings on the forum..
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="card p-3">
                <Card.Img
                  varient="bottom"
                  src="https://www.providesupport.com/blog/wp-content/uploads/2018/02/AI-Chatbots-Vs.-Human-Powered-Live-Chat.png"
                />
                <Card.Body>
                  <Card.Title>Want to search for roommates?</Card.Title>
                  <Card.Text>
                    Search for roommates by posting in the chat forum and
                    connect with other tenants..
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card p-3">
                <Card.Img
                  varient="bottom"
                  src="https://rdcnewsadvice.wpengine.com/wp-content/uploads/2017/10/rental-agreement-realtor.jpg"
                />
                <Card.Body>
                  <Card.Title>Worried about lease aggrement?</Card.Title>
                  <Card.Text>
                    Make quick appointments with leasing agents and let go of
                    your worries.Manage and set reminders for the appointments..
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardDeck>
          </div>
        </main>
      </div>
    );
  }
}
export default Body;
