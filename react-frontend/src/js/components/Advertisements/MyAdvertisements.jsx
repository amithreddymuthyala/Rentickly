//Author: Romal Sehgal
import React from "react";
import { Card, CardColumns, Button, CardGroup } from "react-bootstrap";
import NavBar from "../../../js/components/LandingPage/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../../js/components/Footer/Footer";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";

class MyAdvertisements extends React.Component {
  state = {
    properties: [],
  };

  componentDidMount() {
    const data = { email: localStorage.getItem("email") };
    console.log(localStorage.getItem("email"));
    axios
      .post("/user/getAds", data)
        .then((res) => {
          const records = res.data;
          this.setState({
            properties: records,
          });
        })
        .catch((err) => {
          console.log(err);
        });
  }

  async purgeAdvertisement(id){
    axios.get(`/deleteAd/${id}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err); 
      })
  }

  render() {

    const deleteAdvertisement = (id) => {
      console.log(id);
      this.purgeAdvertisement(id)
      this.props.history.push("/")
    }

    var result = [];
    if (this.state.properties) {
      const records = this.state.properties.record;
      if (records) {
        result = records.map(function (item, i) {
          return (
            <CardGroup>
              <Card key={item.aId} className="col-lg-12 mb-5 ml-auto mr-3">
                {/* <Card.Img variant="top" src={room[0]} /> */}
                <Card.Body>
                  <Card.Title>{item.adTitle}</Card.Title>
                  <Card.Text className="pt-1">{item.propertyDescription}</Card.Text>
                  <Card.Text>
                    <strong>{item.adTitle}</strong>
                  </Card.Text>
                  <Button
                    onClick={() => {
                      alert("Property has been added to your wishlist.!");
                    }}
                  >
                    Add to Wishlist
                  </Button>
                  <Link
                    to={{
                      pathname: `/myAds/ad/${item.aId}`,
                      myCustomProps: item,
                    }}
                  >
                    <Button>View Ad</Button>
                  </Link>
                  <Link
                    to={{
                      pathname: `/myAds/updateAd/${item.aId}`,
                      myCustomProps: item,
                    }}
                  >
                    <Button>Update Ad</Button>
                  </Link>
                  <Button onClick={() => deleteAdvertisement(item.aId)}>Delete Ad</Button>
                  { item.advertisementsStatus === 'accepted' ? (
                    <b>Ad Status: <span style={{ color: 'green'}}>{item.advertisementsStatus}</span></b>
                  ) : ( item.adverisementsStatus === 'rejected' ? (
                      <b>Ad Status: <span style={{ color: 'red'}}>{item.advertisementsStatus}</span></b>
                  ) : (
                      <b>Ad Status: <span style={{ color: 'blue'}}>{item.advertisementsStatus}</span></b>
                  ) 
                  )
                  }
                  
                </Card.Body>
              </Card>
            </CardGroup>
          );
        });
        // console.log(result);
      }
    }

    return (
      <div className="mt-5">
        <NavBar />
        <MDBContainer style={{ marginLeft: '0'}}>
          <MDBBreadcrumb>
            <Link to="/"><MDBBreadcrumbItem>Home&nbsp;/</MDBBreadcrumbItem></Link>
            <MDBBreadcrumbItem active>&nbsp;My Advertisements</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBContainer>
        {result.length === 0 ? "" : result}
        <Footer />
      </div>
    );
  }
}

export default MyAdvertisements;
