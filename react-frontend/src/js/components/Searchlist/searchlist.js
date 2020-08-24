import React, { useEffect, useState } from "react";
import { Card, CardColumns, Button, Row, Badge } from "react-bootstrap";
import NavBar from "../LandingPage/NavBar";
import "../../../css/components/Searchlist/SearchBar.css";
import Footer from "../Footer/Footer";

function Findroom() {
  const [rooms, setRooms] = useState([]);
  const [fRooms, setfRooms] = useState([]);
  const [dRooms, setdRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/user/search").then((response) =>
      response.json().then((data) => {
        setRooms(data.record);
        setdRooms(data.record);
      })
    );
  }, []);

  let fSearch;
  //setting the value of search keyword()
  const handleChange = (event) => {
    fSearch = event.target.value;
    //assigning old values to rooms
    setRooms(dRooms);
  };

  //set the value after search button clicked
  let eRooms = [];
  function filterRoom() {
    //for filtered rooms
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i][1].includes(fSearch)) {
        fRooms.push(rooms[i]);
      }
    }
    //assigning filtered values to room
    setRooms(fRooms);
    setfRooms(eRooms);

    fetch("/user/addSuggestion", {
      mode: "cors",
      crossDomain: true,
      method: "POST",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchTerm: fSearch,
      }),
    });
  }
  return (
    <div className="mt-5">
      <NavBar />
      <div class="search">
        <input
          type="text"
          placeholder="What are you looking for?"
          onChange={handleChange}
        />
        <button type="submit" class="searchButton">
          <i class="fa fa-search" onClick={filterRoom}></i>
        </button>
      </div>
      <Row className="container-fluid">
        {rooms.length !== 0 ? (
          rooms.map((room) => {
            return (
              <Card
                key={room[0]}
                className="col-lg-3 mb-5 ml-5 mr-auto"
                style={{ border: "none" }}
              >
                <Card.Body>
                  <Card.Title>{room[1]}</Card.Title>
                  <Card.Text className="pt-1">{room[3]}</Card.Text>
                  <Card.Text className="pt-1">{room[2]}</Card.Text>
                  <Card.Text>
                    <strong>${room[4]}</strong>/Month
                  </Card.Text>
                  <Button
                    onClick={() => {
                      alert("Property has been added to your wishlist.!");
                    }}
                  >
                    Add to Wishlist
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <center className="container m-5">
            <h2>No Result found!</h2>
          </center>
        )}
      </Row>
      <Footer />
    </div>
  );
}

export default Findroom;
