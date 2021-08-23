import React from "react";
import { Link } from "react-scroll";
import { Nav, Navbar } from "react-bootstrap";
const Navigation = (props) => {
  return (
    <Navbar collapseOnSelect={true} expand="lg" className="navigation">
      <Link
        activeClass="active"
        to="home"
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
      >
        <Navbar.Brand>Here4U</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            eventKey={1}
            as={Link}
            activeClass="active"
            to="software"
            spy={true}
            smooth={true}
            offset={-30}
            duration={500}
            data-toggle="collapse"
            data-target=".navbar-collapse.show"
          ></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Navigation;
