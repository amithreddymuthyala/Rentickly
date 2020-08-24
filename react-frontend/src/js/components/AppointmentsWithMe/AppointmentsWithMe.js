//Author: Amith Reddy Muthyala
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";
import Footer from "../Footer/Footer";
import jwt_decode from "jwt-decode";

class AppointmentsWithMe extends Component{
    constructor(){
        super();

        const token = localStorage.access_token;
        const decoded = jwt_decode(token);

        this.state = {
            userId: decoded.identity.userid,
            'items': []
        }
    }

    accept(i, j, e){
        e.preventDefault();
        console.log("User id:" + i)
        console.log("Ad Id" + j)
        fetch("/acceptappointment/" + i + "/" + j, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state),
          })
            .then(() => {
              this.setState({ redirect: true });
              console.log("redirect" + this.state.redirect);
              window.location.reload(true);
            })
            .catch(function () {
              console.log("error");
            });
    }

    // Calling apoi function to post data
    componentDidMount(){
        this.getItems();
    }

    // Api call to fetch all appointments
    getItems(){
        let userId = this.state.userId;

        // Code to retrieve userid of ad posted
        fetch("/getappointmentsscheduledwithme/" + userId)
        .then((res) => 
            res.json()
        .then(data => {
            this.setState({items: data})
            console.log(this.state.items);
        })
        );
        }

    render(){

        return(
            <div>
            <NavBar />
            <Container>
            <br/>
            <div className="heading1">
                <h1>
                    Pending Appointment Requests
                </h1>
            </div>
            <div className="container">
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th> Request from User Id</th>
                    <th> Advertisement Id</th>
                    <th> Ad title </th>
                    <th> Accept </th>
                </tr>
            </thead>
            <tbody>
                {(this.state.items).map((item, index) => (
                    <tr key={index}>
                        <td>{item.userId}</td>
                        <td>{item.aId}</td>
                        <td>{item.adTitle}</td>
                        <td>
                            <button
                            type="button"
                            name="accept"
                            id="accept"
                            onClick={this.accept.bind(this, item.userId, item.aId)}
                            >
                            Accept
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            </div>
            </Container>
            <Footer />
            </div>
        );
    }
}

export default AppointmentsWithMe;