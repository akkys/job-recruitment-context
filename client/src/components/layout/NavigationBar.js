import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

const NavigationBar = () => {
  return (
    <Navbar bg="secondary" variant="dark" expand="lg" id="nav-bar" fixed="top">
      <Navbar.Brand as={Link} to="/" id="navbar-brand">
        <h2 style={{ fontWeight: "500" }}>
          <span className="text-primary">Job</span>
          <span className="text-success">Recruitment</span>
        </h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <AuthOptions />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
