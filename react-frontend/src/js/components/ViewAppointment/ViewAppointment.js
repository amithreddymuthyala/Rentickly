//Author: Amith Reddy Muthyala
import React, { Component } from 'react';
import { Container, Table } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";
import Footer from "../Footer/Footer";
import jwt_decode from "jwt-decode";


class ViewAppointment extends Component{
    constructor(){
        super();

        const token = localStorage.access_token;
        const decoded = jwt_decode(token);

        this.state = {
            userId: decoded.identity.userid,
            'items': []
        }
    }

    componentDidMount(){
        this.getItems();
    }

    getItems(){
        let userId = this.state.userId;

        fetch("/getallappointments/" + userId)
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
                    Appointments scheduled
                </h1>
            </div>
            <div className="container">
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th> First Name</th>
                    <th> Last Name</th>
                    <th> Date </th>
                    <th> Time </th>
                </tr>
            </thead>
            <tbody>
                {(this.state.items).map((item, index) => (
                    <tr key={index}>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.date}</td>
                        <td>{item.time}</td>
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

export default ViewAppointment;