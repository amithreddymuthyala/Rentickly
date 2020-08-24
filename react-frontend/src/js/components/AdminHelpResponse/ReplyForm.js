//Author: Amith Reddy Muthyala
import React, { Component } from 'react';
import "../../../css/components/AdminHelpResponse/ReplyForm.css";
import NavBar from "../LandingPage/NavBar";
import Footer from "../Footer/Footer";

class ReplyForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: localStorage.getItem('email'),
            reply: null
        }
    }
    handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }

    handleSubmit = (e) => {
        e.preventDefault();
    
        let reply = this.state.reply; 
        console.log(reply);
    
        if(reply !== null){
          console.log(`
            --Submitting--
            Reply : ${this.state.reply}
            `);

            fetch("/sendreply" , {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.state),
          })
            .then(() => {
                alert("Message sent successfully");
                this.props.history.push('/');
            })
            .catch(function () {
              console.log("error");
            });
        } else {
          alert("Enter valid details. Appointment schedule failed");
          console.error(` Form Invalid `);
        }
      };

      clearAll = () => {
        this.setState({
            reply:null,
        });
        document.getElementById("reply-form").reset();
      };

      render() {

        return (
          <div>
            <NavBar />
            <div
          class="container"
          style={{
            display: "flex",
            marginTop: "50px",
            flexDirection: "column",
            justifyContent: "center",
            }}
            >
            <div>
                <form class="form-horizontal"
                  id="reply-form"
                  onSubmit={this.handleSubmit}
                  noValidate
                >
                <h3>Reply Message Form</h3>
                    <div class="form-group">
                    <label htmlFor="reply" class="col-sm-6 control-label">Reply Message*</label>
                    <div class="col-sm-15">
                    <input
                      placeholder="reply"
                      class="form-control"
                      autofocus
                      type="text"
                      name="reply"
                      noValidate
                      onChange={this.handleChange}
                    />
                    </div>
                  </div>
                    <br></br>
                    <button type="submit" class="btn btn-primary btn-block" >Send Reply</button>
                    <br></br>
                    <button
                      type="button"
                      class="btn btn-primary btn-block"
                      name="clearAll"
                      value="cancel"
                      onClick={this.clearAll}
                    >
                      Clear All
                    </button>
                </form>
                <br></br>
                </div>
              </div>
            <Footer />
          </div>
        );
      }
    }
export default ReplyForm;
    