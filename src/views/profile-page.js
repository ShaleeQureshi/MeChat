import React from "react";
import firebase from "firebase";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import MyModal from "../components/mymodal";
import img from "../assets/images/Google__G__Logo.svg.png";

import { Container, Button, Row, Col, Image, Form } from "react-bootstrap";

class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          name: "",
          handle: "",
          email: "",
          friends: "",
        },
      ],
    };
  }

  componentDidMount() {
    const data = [];
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser["uid"])
      .on("value", (snapshot) => {
        const allData = snapshot.val();
        const completeData = {
          name: allData.name,
          handle: allData.handle,
          email: allData.email,
          friends: allData.friends,
        };
        data.push(completeData);
        this.setState({ data });
      });
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <Button
            onClick={(e) => {
              e.preventDefault();
              firebase
                .auth()
                .signOut()
                .then(() => {
                  window.location.reload();
                });
            }}
          >
            signout
          </Button>
          <Container>
            <MyModal
              btnText="Update Information"
              modalTitle="Update User Information"
              modalBody={
                <div>
                  <Form.Control
                    type="text"
                    placeholder={this.state.data[0].name}
                    id="name"
                  />
                  <Form.Control
                    type="text"
                    placeholder={this.state.data[0].handle}
                    readOnly
                  />
                  <Form.Control
                    type="text"
                    placeholder={this.state.data[0].email}
                    readOnly
                  />
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      alert(document.getElementById("name").value);
                    }}
                  >
                    Save Data
                  </Button>
                </div>
              }
            />
            <Row>
              <Col sm={8}>
                <h3>Name: {this.state.data[0].name}</h3>
                <h3>Handle: {this.state.data[0].handle}</h3>
                <h3>Email: {this.state.data[0].email}</h3>
                <h3>Friends Counter: {this.state.data[0].friends}</h3>
              </Col>
              <Col sm={4}>
                <Image className="img" src={img} thumbnail />
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}
export default ProfilePage;
