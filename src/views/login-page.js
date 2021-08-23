import React, { useContext } from "react";
import firebase from "firebase";
import { Button, Form } from "react-bootstrap";
import Footer from "../components/footer";
import MyModal from "../components/mymodal";
import { AuthContext } from "../scripts/auth";
import history from "../scripts/history";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      handleExists: false,
    };
  }
  // if (currentUser && typeof previousRoute === "undefined") {
  //   firebase
  //     .database()
  //     .ref(`/users/${currentUser["uid"]}`)
  //     .on("value", (snapshot) => {
  //       console.log(snapshot);
  //       console.log(currentUser);
  //       console.log("handle: " + snapshot.handle);
  //       history.push(`/profile/${snapshot.handle}`);
  //     });
  // } else if (currentUser && typeof previousRoute !== "undefined") {
  //   history.push(previousRoute);
  // }
  render() {
    return (
      <div>
        <div className="home-bg wrapper">
          <div className="center text-center">
            <h1>
              Welcome to <mark className="highlight">MeChat</mark>
            </h1>
            <MyModal
              btnClass="w-50 mt-2"
              btnText="Sign In"
              modalTitle="Sign In"
              modalBody={
                <div>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="Enter Email"
                    id="email"
                  />

                  <Form.Control
                    className="mb-2"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                  />
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      firebase
                        .auth()
                        .signInWithEmailAndPassword(
                          document.getElementById("email").value,
                          document.getElementById("password").value
                        )
                        .then(() => {
                          firebase
                            .database()
                            .ref("/users/" + firebase.auth().currentUser["uid"])
                            .on("value", (snapshot) => {
                              history.push("/profile:" + snapshot.val().handle);
                            });
                        })
                        .catch((err) => {
                          alert(err);
                        });
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              }
            />
            <MyModal
              btnClass="w-50 mt-2"
              btnText="Sign Up"
              modalTitle="Sign Up"
              modalBody={
                <div>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="Enter Full Name"
                    id="name"
                  />
                  <Form.Control
                    className="mb-2"
                    type="text"
                    placeholder="Enter your desired handle"
                    id="handle"
                  />
                  <Button
                    className="mb-2"
                    onClick={(e) => {
                      e.currentTarget.blur();
                      e.preventDefault();

                      firebase
                        .database()
                        .ref(
                          "/handles/" + document.getElementById("handle").value
                        )
                        .on("value", (snapshot) => {
                          if (snapshot.exists()) {
                            this.setState({ handleExists: true });
                            alert(
                              "Your handle already exists! Please change it and re-check"
                            );
                          } else {
                            this.setState({ handleExists: false });
                            alert("Your handle is good to go!");
                          }
                        });
                    }}
                  >
                    Check Handle
                  </Button>
                  <Form.Control
                    className="mb-2"
                    type="email"
                    placeholder="Enter Email"
                    id="email"
                  />

                  <Form.Control
                    className="mb-2"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                  />
                  <Button
                    onClick={(e) => {
                      const clearFields = () => {
                        document.getElementById("name").value = "";
                        document.getElementById("handle").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("password").value = "";
                      };

                      e.preventDefault();

                      if (this.state.handleExists) {
                        alert(
                          "Your handle already exists! Please change it and re-check it before submitting the form!"
                        );
                      } else {
                        const name = document.getElementById("name").value;
                        const handle = document.getElementById("handle").value;
                        const email = document.getElementById("email").value;
                        const password =
                          document.getElementById("password").value;
                        clearFields();

                        firebase
                          .auth()
                          .createUserWithEmailAndPassword(email, password)
                          .then(() => {
                            firebase
                              .database()
                              .ref(
                                "/users/" + firebase.auth().currentUser["uid"]
                              )
                              .update({
                                name: name,
                                handle: handle,
                                email: email,
                                friends: 0,
                              })
                              .then(() => {
                                firebase
                                  .database()
                                  .ref("/handles/" + handle)
                                  .update({
                                    handle: handle,
                                    name: name,
                                  })
                                  .then(() => {
                                    alert("User has been created!");
                                    history.push("/profile:" + handle);
                                  });
                              });
                          })
                          .catch((err) => {
                            alert("Error when creating user\n" + err);
                          });

                        clearFields();
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              }
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LoginPage;
