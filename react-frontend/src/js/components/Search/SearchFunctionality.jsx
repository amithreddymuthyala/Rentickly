import React, { Component } from "react";
import "./SearchFunctionality.css";
// import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class SearchFunctionality extends Component {
  keyPress = (e) => {
    if (e.keyCode == 13) {
      this.props.history.push(`/DisplaySearch/` + e.target.value);
    }
  };
  render() {
    return (
      <div className="search-container">
        <input
          input
          className="form-control"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onKeyDown={this.keyPress}
        />
      </div>
    );
  }
}

export default withRouter(SearchFunctionality);
