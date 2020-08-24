import React, { Component, Fragment } from "react";
import {
  getList,
  addToList,
  deleteItem,
  updateItem,
  doneList,
} from "./ListFunctions";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Jump from "react-reveal/Jump";
import { MDBBtn } from "mdbreact";
import img from "./to-do-list.jpg";
import firebase from "../../../index";
import jwt_decode from "jwt-decode";
import Navbar from "../LandingPage/NavBar";

const firebaseUrl = "gs://rentickly.appspot.com";

class List extends Component {
  constructor() {
    const token = localStorage.access_token;
    const decoded = jwt_decode(token);
    super();
    this.state = {
      userid: decoded.identity.userid,
      id: "",
      term: "",
      editDisabled: false,
      items: [],
      tasksDone: [],
      files: null,
      current: "",
      URL: "",
      dones: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.updateLink = this.updateLink.bind(this);
    this.showImage = this.showImage.bind(this);
  }

  componentDidMount() {
    this.getAll();
    this.getDone();
  }

  onChange = (e) => {
    this.setState({
      term: e.target.value,
      editDisabled: "disabled",
    });
  };

  getAll = () => {
    getList(this.state.userid).then((data) => {
      this.setState(
        {
          term: "",
          items: [...data],
        },
        () => {}
      );
    });
  };

  getDone = () => {
    doneList(this.state.userid).then((data) => {
      this.setState(
        {
          dones: [...data],
        },
        () => {}
      );
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ editDisabled: "" });
    addToList(this.state.term).then(() => {
      this.getAll();
    });
  };

  //   onUpdate = (e) => {
  //     e.preventDefault();
  //     updateItem(this.state.term, this.state.id).then(() => {
  //       this.getAll();
  //     });
  //   };

  onEdit = (item, itemid, link, e) => {
    e.preventDefault();
    this.setState({
      id: itemid,
      term: item,
      current: item,
      URL: link,
    });
    this.showImage();

    this.forceUpdate();
  };

  updateLink = () => {
    updateItem(this.state.URL, this.state.userid, this.state.current).then(
      () => {
        this.getAll();
        this.getDone();
      }
    );
  };

  onDelete = (val, item, e) => {
    e.preventDefault();

    deleteItem(val);
    var data = [...this.state.items];
    data.filter((item, index) => {
      if (item[1] === val) {
        data.splice(index, 1);
      }
      return true;
    });
    this.delete(item);
    this.setState({ items: [...data] });
  };

  handleChange = (files, item) => {
    this.setState({
      files: files,
      current: item,
    });
  };

  handleSave = (item) => {
    let file = this.state.files[0];
    let bucketName = "Rental_Application";

    let storageRef = firebase
      .storage()
      .ref(`${bucketName}/${this.state.userid}/${item}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      let downloadURL = uploadTask.snapshot.downloadURL;
    });
    // this.showImage.bind(this,item);
    let getstorage = firebase.storage().ref();
    getstorage
      .child("Rental_Application/" + this.state.userid + "/" + item)
      .getDownloadURL()
      .then((url) => {
        this.setState({ URL: url, current: item });

        this.updateLink();
        document.getElementById("new-img").src = url;
      })
      .catch((res) => {
        console.log(res);
      });
  };

  showImage = (item) => {
    let storageRef = firebase.storage().ref();
    let spaceRef = storageRef.child(
      "Rental_Application/" + this.state.userid + "/" + item
    );
    storageRef
      .child("Rental_Application/" + this.state.userid + "/" + item)
      .getDownloadURL()
      .then((url) => {
        this.setState({ URL: url });

        this.updateLink();
        document.getElementById("new-img").src = url;
      })
      .catch((res) => {
        console.log(res);
      });
  };
  delete = (item) => {
    let storageRef = firebase.storage().ref();
    storageRef
      .child("Rental_Application/" + this.state.userid + "/" + item)
      .delete()
      .catch((res) => {
        console.log(res);
      });
    this.getAll();
    this.getDone();
  };

  render() {
    return (
      <Fragment>
        <Navbar />
        <div>
          <br />
          <header
            className="jumbotron text-center"
            style={{
              backgroundImage: `url(${img})`,
              paddingTop: "120px",
              backgroundPosition: "center",
              backgroundRepeat: "no - repeat",
              backgroundSize: "cover",
              width: "100%",
            }}
          ></header>

          <div className="col-md-13 white-smoke">
            <Jump>
              <h1 style={{ display: "center", fontFamily: "Lucida Console" }}>
                {"  "}
                Todo's{" "}
              </h1>
            </Jump>
            <table className="table">
              <tbody>
                <div>
                  <ListGroup>
                    {this.state.items.length < 1 ? (
                      <ListGroupItem
                        style={{ textAlign: "center", width: "100%" }}
                      >
                        No Todo's
                      </ListGroupItem>
                    ) : (
                      ""
                    )}
                    {this.state.items.map((item, index) => (
                      <div className="row ml-1">
                        <ListGroupItem style={{ width: "80%" }} key={index}>
                          {item[0]}
                        </ListGroupItem>
                        <div>
                          <input
                            type="file"
                            style={{ display: "none" }}
                            ref={(fileInput) => (this.fileInput = fileInput)}
                            onChange={(e) => {
                              this.handleChange(e.target.files, item[0]);
                            }}
                          />
                          <MDBBtn
                            gradient="aqua"
                            onClick={() => this.fileInput.click()}
                          >
                            Pick File
                          </MDBBtn>
                          <MDBBtn
                            gradient="peach"
                            className="btn btn-info ml-2 mr-2"
                            onClick={this.handleSave.bind(this, item[0])}
                          >
                            Save
                          </MDBBtn>

                          <div
                            id="myModal"
                            className="modal fade"
                            tabindex="-1"
                            role="dialog"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-body">
                                  <img
                                    id="new-img"
                                    className="img-responsive"
                                    alt="Image preview"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div>
                            <img id="new-img" />
                          </div> */}
                        </div>
                      </div>
                    ))}
                  </ListGroup>

                  <Jump>
                    <h1
                      style={{
                        display: "center",
                        fontFamily: "Lucida Console",
                      }}
                    >
                      {"  "}
                      Uploads{" "}
                    </h1>
                  </Jump>
                  <ListGroup>
                    {this.state.dones.length < 1 ? (
                      <ListGroupItem
                        style={{ textAlign: "center", width: "100%" }}
                      >
                        No Uploads Yet
                      </ListGroupItem>
                    ) : (
                      ""
                    )}
                    {this.state.dones.map((item, index) => (
                      <div className="row ml-1">
                        <ListGroupItem style={{ width: "80%" }} key={index}>
                          {item[0]}
                        </ListGroupItem>

                        <div>
                          <input
                            type="file"
                            style={{ display: "none" }}
                            ref={(fileInput) => (this.fileInput = fileInput)}
                            onChange={(e) => {
                              this.handleChange(e.target.files, item[0]);
                            }}
                          />
                          <MDBBtn
                            gradient="aqua"
                            onClick={() => this.fileInput.click()}
                          >
                            Pick File
                          </MDBBtn>
                          <MDBBtn
                            gradient="peach"
                            className="btn btn-info ml-2 mr-2"
                            onClick={this.handleSave.bind(this, item[0])}
                          >
                            Save
                          </MDBBtn>

                          <MDBBtn
                            gradient="purple"
                            className="btn btn-danger"
                            // disabled={this.state.editDisabled}
                            onClick={this.onDelete.bind(this, item[1], item[0])}
                          >
                            Delete
                          </MDBBtn>

                          <MDBBtn
                            gradient="aqua"
                            className="btn btn-danger"
                            data-toggle="modal"
                            data-target="#myModal"
                            // disabled={this.state.editDisabled}
                            onClick={this.showImage.bind(this, item[0])}
                          >
                            Show
                          </MDBBtn>

                          <div
                            id="myModal"
                            className="modal fade"
                            tabindex="-1"
                            role="dialog"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-body">
                                  <img
                                    id="new-img"
                                    className="img-responsive"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* <div>
                            <img id="new-img" />
                          </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default List;
