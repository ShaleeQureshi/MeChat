import React from "react";
import firebase from "firebase";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import MyModal from "../components/mymodal";
import img from "../assets/images/Google__G__Logo.svg.png";

import {
  Container,
  Button,
  Row,
  Col,
  Image,
  Form,
  Card,
} from "react-bootstrap";

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
      posts: [],
    };
  }

  componentDidMount() {
    this.getUserPosts();
    this.getProfileData();
  }

  getProfileData() {
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

  async getUserPosts() {
    try {
      firebase
        .database()
        .ref(`/users/${firebase.auth().currentUser["uid"]}/posts`)
        .on("value", (snapshot) => {
          var posts = [];
          snapshot.forEach((snap) => {
            posts.push(snap.val());
          });
          this.setState({ posts });
        });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="wrapper">
          <div className="profile-user-info text-center">
            <Image className="profile-img" src={img} thumbnail />
            <h3>Welcome: {this.state.data[0].name}</h3>
            <h3 id="handle" className="mb-2">
              @{this.state.data[0].handle}
            </h3>
            <MyModal
              btnText="Update Information"
              modalTitle="Update User Information"
              modalBody={
                <div>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder={this.state.data[0].name}
                      id="name"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Handle</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder={this.state.data[0].handle}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="mb-2"
                      type="text"
                      placeholder={this.state.data[0].email}
                      readOnly
                    />
                  </Form.Group>
                  <Button
                    className="w-100"
                    variant="outline-success"
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
            <h3 className="mt-2">
              <u>Friends</u>
              <br />
              {this.state.data[0].friends}
            </h3>
          </div>
          <Container className="mt-5">
            <h3 className="text-center">
              @{this.state.data[0].handle}'s Posts
              <hr id="underline" />
            </h3>
            <div>
              {this.state.posts.map((post) => {
                return (
                  <Card key={post.time} className="mt-3 mb-3">
                    <Card.Header>post.title</Card.Header>
                    <Card.Body>
                      <Card.Text>{post.post}</Card.Text>
                    </Card.Body>
                    <Card.Footer>Posted on {post.time}</Card.Footer>
                  </Card>
                );
              })}
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}
export default ProfilePage;
