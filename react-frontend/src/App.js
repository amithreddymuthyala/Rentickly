import React, { Component } from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { HashRouter } from "react-router-dom";

import AboutUs from "./js/components/AboutUs/AboutUs";
import FAQs from "./js/components/FAQs/FAQContainer";
import Help from "./js/components/Contact/Help";
import LandingPage from "./js/components/LandingPage/LandingPage";
import PageNotFound from "./js/components/LandingPage/PageNotFound";
import SignUp from "./js/components/Login/SignUp";
import SignIn from "./js/components/Login/SignIn";
import Resetpassword from "./js/components/LandingPage/Resetpassword";
import Profile from "./js/components/Login/Profile";
import UpdateProfile from "./js/components/Login/UpdateProfile";
import Review from "./js/components/Review/Review";
import PostAdvertisement from "./js/components/PostAdvertisement/PostAd";
//import Home from "./Component/SearchBar/Home";
import BookAppointment from "./js/components/BookAppointment/BookAppointment";
import SearchlistPage from "./js/components/Searchlist/searchlist";
import ViewPost from "./js/components/ViewPost/ViewPostPage";
import ViewAppointment from "./js/components/ViewAppointment/ViewAppointment";
import AppointmentsWithMe from "./js/components/AppointmentsWithMe/AppointmentsWithMe";
import MyAdvertisements from "./js/components/Advertisements/MyAdvertisements";
import ViewAdvertisement from "./js/components/Advertisements/ViewAdvertisement";
import RentalForm from "./js/components/RentalApplication/RentalForm";
import MyApplications from "./js/components/MyRentalApplications/MyApplications";
import AdminAds from "./js/components/admin/AdminAds";
import UpdateAdvertisement from "./js/components/Advertisements/UpdateAdvertisement";
import Todo from "./js/components/Todo/List";
import Insights from "./js/components/Insights/Insights";
import ViewPdf from "./js/components/Insights/ViewPdf";
import Maps from "./js/components/Maps/Maps";
import AdminHelpResponse from "./js/components/AdminHelpResponse/AdminHelpResponse";
import ReplyForm from "./js/components/AdminHelpResponse/ReplyForm";
import DisplaySearch from "./js/components/DisplaySearch/DisplaySearch";

class App extends Component {
  render() {
    return (
      <HashRouter className="container">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/Resetpassword" component={Resetpassword} />
          <Route exact path="/AboutUs" component={AboutUs} />
          <Route exact path="/Help" component={Help} />
          <Route exact path="/FAQs" component={FAQs} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/SignIn" component={SignIn} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/Update" component={UpdateProfile} />
          <Route exact path="/BookAppointment" component={BookAppointment} />
          <Route exact path="/ViewAppointment" component={ViewAppointment} />
          <Route
            exact
            path="/AppointmentsWithMe"
            component={AppointmentsWithMe}
          />
          <Route exact path="/DisplaySearch/:query" component={DisplaySearch} />
          <Route
            exact
            path="/AdminHelpResponse"
            component={AdminHelpResponse}
          />
          <Route exact path="/ReplyForm" component={ReplyForm} />
          <Route exact path="/Review" component={Review} />
          <Route exact path="/ViewPost" component={ViewPost} />
          <Route exact path="/searchRoom" component={SearchlistPage} />
          <Route exact path="/myAds" component={MyAdvertisements} />
          <Route exact path="/myAds/ad/:id" component={ViewAdvertisement} />
          {/* <Route exact path="/Search" component={Home} /> */}
          <Route exact path="/postAd" component={PostAdvertisement} />
          <Route exact path="/rentalApp" component={RentalForm} />
          <Route exact path="/insights" component={Insights} />
          <Route exact path="/viewPdf" component={ViewPdf} />
          <Route
            exact
            path="/myAds/updateAd/:id"
            component={UpdateAdvertisement}
          />
          <Route exact path="/myapps" component={MyApplications} />
          <Route exact path="/Todo" component={Todo} />
          <Route exact path="/admin/ads" component={AdminAds} />
          <Route exact path="/maps" component={Maps} />
          <Route exact path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
