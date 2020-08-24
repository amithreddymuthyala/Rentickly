//Author: Romal Sehgal
import React from "react";
import { Card, CardColumns, Button, CardGroup } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { DropDownList } from '@progress/kendo-react-dropdowns';
import Footer from "../Footer/Footer";

const adStatus = ['Reject Advertisement', 'Accept Advertisement']

class AdminAds extends React.Component {
    
    state = {
            advertisements: [],
            adStatusSelectedValue: "submitted"
    }
    
   
    async componentDidMount() {
        await axios
        .get("/admin/getAllAds")
            .then((res) => {
                const records = res.data;
                this.setState({
                    advertisements: records
                });
            })
        .catch((err) => {
            console.log(err);
        });
  }


  async acceptrequestAd(id){

    const data = {  "status": "accepted"  }
    await axios.put(`/admin/updateAdStatus/${id}`, data)
      .then(res => {
          console.log(res.data);
      })
      .catch(err => {
          console.log(err); 
    })
}

async rejectrequestAd(id){

  const data = {  "status": "rejected"  }
  await axios.post(`/admin/updateAdStatus/${id}`, data)
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err); 
  })
}


  render() { 

    const AcceptAdvertisement = (id) => {
      console.log(id);
      this.acceptrequestAd(id)
      window.location.reload();
    }

    const RejectAdvertisement = (id) => {
      console.log(id);
      this.rejectrequestAd(id)
      window.location.reload();
    }

    let selectedValue = 'submitted';
    var result = [];
    if (this.state.advertisements.length !== 0) {
      const records = this.state.advertisements.record;
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
                  <div>
                </div>
                { item.advertisementsStatus === 'accepted' ? (
                    [<Button disabled>Accept Advertisement</Button>,
                      <Button onClick={() => RejectAdvertisement(item.aId)}>Reject Advertisement</Button>]
                ): null 
                }
                { item.advertisementsStatus === 'rejected' ? (
                    [<Button onClick={() => AcceptAdvertisement(item.aId)}>Accept Advertisement</Button>
                    ,<Button disabled>Reject Advertisement</Button>]
                ): null }
                {
                  item.advertisementsStatus === 'submitted' ? (
                    [<Button onClick={() => AcceptAdvertisement(item.aId)}>Accept Advertisement</Button>,
                    <Button onClick={() => RejectAdvertisement(item.aId)}>Reject Advertisement</Button>] ) :null 
                }


                { item.advertisementsStatus === 'accepted' ? (
                    <b>Ad Status: <span style={{ color: 'green'}}>{item.advertisementsStatus}</span></b>
                  ) : ( item.adverisementsStatus === 'rejected' ? (
                      <b>Ad Status: <span style={{ color: 'red'}}>{item.advertisementsStatus}</span></b>
                  ) : (
                      <b>Ad Status: <span style={{ color: 'blue'}}>{item.advertisementsStatus}</span></b>
                  ) 
                  )
                  }
                {/* <b>Change Advertisement Status: </b> <DropDownList
                    data={adStatus}
                    value={selectedValue}
                    onChange={e => handleDropDownChange(e, item.aId) }
                /> */}
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
        <h2 style={{ textAlign: 'center', marginBottom: '2%'}}>Advertisement Received</h2>
            {result.length === 0 ? "" : result}
        <Footer />
      </div>
    );
  }
}

export default AdminAds;
