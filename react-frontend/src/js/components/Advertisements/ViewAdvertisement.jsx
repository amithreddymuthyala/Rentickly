//Author: Romal Sehgal
import React from "react";
import NavBar from "../../../js/components/LandingPage/NavBar";
import Footer from "../../../js/components/Footer/Footer";
import { Button } from "react-bootstrap";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";
import axios from "axios"; 
import img12 from "../../../assets/images/image-12.png"
import img13 from "../../../assets/images/image-13.png"
import img14 from "../../../assets/images/image-14.png"
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";

class ViewAdvertisement extends React.Component {
    constructor(props) {
      super(props);
      console.log(this.props.location.myCustomProps);
      localStorage.setItem('aid', this.props.location.myCustomProps.aId); 
    }

  state = {
    aid: this.props.location.myCustomProps.aId,
    userId: this.props.location.myCustomProps.userId,
    adTitle: this.props.location.myCustomProps.adTitle,
    address: this.props.location.myCustomProps.propertyAddress,
    desc: this.props.location.myCustomProps.propertyDescription,
    location: this.props.location.myCustomProps.propertyLocation,
    rentAmount: this.props.location.myCustomProps.rentAmount,
    petFriendly: this.props.location.myCustomProps.petFriendly === 0 ? 'yes': 'no',
    leaseType: this.props.location.myCustomProps.leaseType === 0 ? 'Long Term': 'Short Term',
    type: this.props.location.myCustomProps.propertyType,
    zipcode: this.props.location.myCustomProps.zipCode,

    imageUrls: [],
    reviews: [],
    rentalAppPosted: false 
  };

  async componentDidMount() {
      const {aid} = this.state
      console.log(aid); 
      const data = { "aid": aid }
      await axios.post("/viewReview", data)
        .then(res => {
          const result = res.data.result;
          this.setState({
            reviews: result
          })
        })
        .catch(err => {
          console.log(err); 
      })

      await axios.get(`/getPropImages/${aid}`)
        .then(res => {
          this.setState({
            imageUrls: res.data 
          })
          console.log(this.state.imageUrls);
        })
        .catch(err => {
          console.log(err); 
      })

      await axios.get(`/checkrentalApp/${aid}`)
        .then(res => {
            this.setState({ rentalAppPosted: res.data.result })
            console.log(res.data.result); 
          })
        .catch(err => {
            console.log(err);
        })
    }


  render() {
    const { aid, userId, adTitle, desc, address, location, zipcode, reviews, imageUrls, rentalAppPosted
          , rentAmount, leaseType, petFriendly } = this.state; 
    let displayImages = null; 

    if(imageUrls.length !== 0){
        displayImages =  imageUrls.result.map((item, el) => {
          return  <MDBCarouselItem itemId={el}>
                    <MDBView>
                        <img
                          className="d-block w-100"
                          src={item}
                          alt="First slide"
                        />
                    </MDBView>
                </MDBCarouselItem>
        })
    }
    return (
      <div className="mt-5">
        <NavBar />
        <MDBContainer>
          <MDBBreadcrumb>
            <Link to="/"><MDBBreadcrumbItem>Home&nbsp;/&nbsp;</MDBBreadcrumbItem></Link>
            <Link to="/myAds"><MDBBreadcrumbItem>My Advertisements&nbsp;/</MDBBreadcrumbItem></Link>
            <MDBBreadcrumbItem active>&nbsp;View Advertisement</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </MDBContainer>
        <div style={{ width: '80%', marginLeft: '10%', textAlign: 'center' }} class="card card-cascade wider reverse">
            <div class="view view-cascade overlay">
                <MDBCarousel 
                  activeItem={1}
                  length={3}
                  showControls={true}
                  showIndicators={true}
                  className="z-depth-1"
                >
            <MDBCarouselInner>
                { displayImages }
            </MDBCarouselInner>
          </MDBCarousel>
            </div>
            <div class="card-body card-body-cascade text-center">
                <h4 class="card-title"><strong>{ adTitle }</strong></h4>
                <h5 class="card-title"><strong>{ address }, {location}, {zipcode}</strong></h5>
                <h6 class="font-weight-bold indigo-text py-2">Ad Id: { aid }</h6>
                <span style={{ color: 'green'}}>Rent Amount: CAD${ rentAmount  }</span>
                <br></br>
                <span style={{ color: 'orange'}}>Lease Type: { leaseType  }</span>
                <br></br>
                <span style={{ color: 'brown'}}>Pet Friendly: { petFriendly  }</span>
                <p style={{ fontSize: '30px'  }} class="card-text">
                    { desc }
                </p>
                <span class="font-weight-bold indigo-text py-2"></span>
      </div>
          <Link style={{ textAlign: 'center' }}
              to={{
                pathname: `/BookAppointment`,
                data: { aid: aid },
              }}
            >
              <Button>Book Appointment</Button>
          </Link>
          { rentalAppPosted === false ? (
              <Link style={{ textAlign: 'center' }}
                    to={{
                          pathname: `/rentalApp`,
                          data: { aid: aid  },
                        }}
                      >
                <Button>Submit Application</Button>
              </Link>
          ) : null        }
          <Link style={{ textAlign: 'center', marginBottom: '1%' }}
              to={{
                pathname: `/Review`,
                data: { aid: aid, userId: userId, house_name: adTitle },
              }}
            >
              <Button>Add Review</Button>
          </Link>
        <br></br>
        <hr></hr>
          { reviews !== null ? (
              reviews.map((el, ind) => {
                return (
                  <div>
                      <h2>Review {ind+1}</h2>
                      <h4>Review Headline: {el.headline}</h4>
                      <p>{el.description}</p>
                  </div>
                )
              })
          ): null 
        }
        </div>
        <Footer />
      </div>
    );
  }
}

export default ViewAdvertisement;
