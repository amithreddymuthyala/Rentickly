// author: Sharan Sudhir
import React, { Component } from "react";
import NavBar from "../../../js/components/LandingPage/NavBar";
import "../../../css/components/Review/Review.css";
import StarRatings from "react-star-ratings";

class Review extends Component {
  state = {
    aid: this.props.location.data.aid,
    userId: this.props.location.data.userId,
    house_name: this.props.location.data.house_name,
    headline: "",
    content: "",
    rating: 0,
    status: "",
  };
  changeRating = (newRating) => {
    this.setState({
      rating: newRating,
    });
  };

  submitData() {
    const { headline, content, rating, aid, userId } = this.state;

    fetch("/users/review", {
      mode: "cors",
      crossDomain: true,
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headline: headline,
        content: content,
        rating: rating,
        aid: aid,
        userId: userId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          status: data.Result,
        });
      });
  }

  handleSubmit = () => {
    const { headline, content, rating } = this.state;

    if (headline === "" && content === "") {
      alert("Enter Headline and Review");
    } else if (headline === "") {
      alert("Enter Headline");
    } else if (content === "") {
      alert("Enter Content");
    } else if (rating === 0) {
      alert("Enter rating");
    }

    if (headline !== "" && content !== "" && rating !== 0) {
      this.submitData();
    }
  };
  render() {
    const { status, house_name } = this.state;
    var STATUS = "";
    if (status !== "") {
      STATUS = <h1>Review Submitted</h1>;
    }
    return (
      <section>
        <NavBar />
        <div className="reviews">
          <form>
            <h1>{house_name}</h1>
            <div class="form-group">
              <label for="formGroupExampleInput">Headline</label>
              <input
                type="text"
                class="form-control"
                id="formGroupExampleInput"
                onChange={(e) => this.setState({ headline: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea1">Add Review</label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => this.setState({ content: e.target.value })}
              ></textarea>
            </div>
            <StarRatings
              rating={this.state.rating}
              starRatedColor="blue"
              changeRating={this.changeRating}
              numberOfStars={5}
              name="rating"
            />
            <div className="form-group" id="btn">
              <button
                type="button"
                class="btn btn-success"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {STATUS}
      </section>
    );
  }
}

export default Review;
