import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import firebase from "firebase";
import history from "../scripts/history";
const Navigation = () => {
  const signOut = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };

  return (
    <Navbar expand="lg" className="navigation">
      <Navbar.Brand>MeChat</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/NorthHacks/#/mission">About</Nav.Link>
          <Nav.Link href="/NorthHacks/#/mission">Profile</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            onClick={(e) => {
              signOut(e);
            }}
          >
            SignOut
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navigation;
