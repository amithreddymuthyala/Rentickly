import React, { Component } from "react";
import LandingPage from "../LandingPage/LandingPage";
import NavBar from "../LandingPage/NavBar";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

class DisplaySearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      accessToken: null,
      result: [],
    };
  }

  async getResult() {
    const { searchTerm } = this.state;
    console.log(searchTerm);
    await axios
      .get("/searchResults/" + searchTerm)
      .then((response) => {
        this.setState(
          {
            searchTerm: "",
            result: response.data.Result,
          },
          () => {
            console.log(this.state.result);
          }
        );
      })
      .catch((err) => console.log(err));
  }
  async postSearchTerm(token) {
    const { searchTerm } = this.state;
    const decoded = jwt_decode(token);

    const data = { userid: decoded.identity.userid };
    console.log(searchTerm);
    await axios
      .post("/searchResults/" + searchTerm, data)
      .then((response) => {
        this.setState(
          {
            searchTerm: "",
            result: response.data.Result,
          },
          () => {
            console.log(this.state.result);
          }
        );
      })
      .catch((err) => console.log(err));
  }

  componentDidUpdate() {
    const { searchTerm, accessToken } = this.state;
    console.log(localStorage.access_token);
    if (localStorage.access_token) {
      if (searchTerm.length != 0) {
        this.postSearchTerm(localStorage.access_token);
      }
    } else {
      if (searchTerm.length != 0) {
        this.getResult();
      }
    }
  }

  componentDidMount() {
    if (localStorage.accessToken !== undefined) {
      this.setState({ accessToken: localStorage.access_token });
    }
    // console.log(this.props);
    this.setState({
      searchTerm: this.props.match.params.query,
    });
  }
  render() {
    // console.log(this.state.searchTerm);

    const { result } = this.state;

    let RES;
    if (result.length == 0) {
      RES = <h1>No Result Found</h1>;
    } else {
      console.log("result:");
      console.log(result);
      console.log(result.length);
      RES = result.map(function (item, key) {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{item.adTitle}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.propertyType}
              </Card.Subtitle>
              <Card.Text>{item.propertyAddress}</Card.Text>
              <Link
                to={{
                  pathname: `/myAds/ad/${item.aId}`,
                  myCustomProps: item,
                }}
              >
                <Button>View Advertisement</Button>
              </Link>
            </Card.Body>
          </Card>
        );
      });
    }

    return (
      <div>
        <NavBar />
        <div className="search-container">
          <input
            input
            className="form-control"
            type="text"
            placeholder="Search"
            aria-label="Search"
            // onKeyDown={this.keyPress}
          />
        </div>
        {RES}
      </div>
    );
  }
}

export default DisplaySearch;
