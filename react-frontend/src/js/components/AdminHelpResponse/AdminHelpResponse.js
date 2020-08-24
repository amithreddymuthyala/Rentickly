//Author: Amith Reddy Muthyala
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";
import Footer from "../Footer/Footer";
import { Link } from 'react-router-dom';

class AdminHelpResponse extends Component{
    constructor(){
        super();

        this.state = {
            reply: null,
            redirect: false,
            'items': []
        }
    }

    handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }

    accept(i, e){
        e.preventDefault();
        console.log("Email:" + i)
        
        // Add to local storage
        localStorage.setItem('email', i); 

        // Redirect to reply form
        this.setState({redirect: true});


        // fetch("/sendreply/" + i, {
        //     method: "post",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(this.state),
        //   })
        //     .then(() => {
        //       this.setState({ redirect: true });
        //       console.log("redirect" + this.state.redirect);
        //       window.location.reload(true);
        //     })
        //     .catch(function () {
        //       console.log("error");
        //     });
    }

    // Calling apoi function to post data
    componentDidMount(){
        this.getItems();
    }

    // Api call to fetch all appointments
    getItems(){

        // Code to retrieve userid of ad posted
        fetch("/getallcomplaints")
        .then((res) => 
            res.json()
        .then(data => {
            this.setState({items: data})
            console.log(this.state.items);
        })
        );
        }

    render(){
        const redirect = this.state.redirect;

        if (redirect === true) {
        return <Redirect to="/ReplyForm" />;
        }

        return(
            <div>
            <NavBar />
            <Container>
            <br/>
            <div className="heading1">
                <h1>
                    Pending Help Requests
                </h1>
            </div>
            <div className="container">
            <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th> Name</th>
                    <th> Email Id</th>
                    <th> Subject </th>
                    <th> Message </th>
                    <th> Reply </th>
                </tr>
            </thead>
            <tbody>
                {(this.state.items).map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.subject}</td>
                        <td>{item.message}</td>
                        <td>
                            <button
                            type="button"
                            name="accept"
                            id="accept"
                            onClick={this.accept.bind(this, item.email)}
                            >
                            Reply
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

export default AdminHelpResponse;