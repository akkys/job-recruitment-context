import React, { useContext } from "react";
import { Button, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import DropdownItem from "react-bootstrap/DropdownItem";

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/signup");
  const login = () => history.push("/login");

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/login");
  };

  console.log(userData.user);

  return (
    <>
      {userData.user ? (
        <>
          {userData.user.category === "Employer" ? (
            <>
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>

                <NavDropdown title="Solutions" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/employerDetails">
                    For Employers
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/agenciesDetails">
                    For Agencies
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/integrationDetails">
                    Compliance & Integrations
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Dropdown className="mr-2">
                <Dropdown.Toggle
                  variant="default"
                  className="text-light"
                  id="dropdown-basic"
                >
                  <span className="mr-1">
                    <i className="fa fa-user-circle-o fa-lg mr-2" />
                    {userData.user.name}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>Company Details</Dropdown.Header>
                  <Dropdown.Item as={Link} to="/companyDetails">
                    Company Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/team">
                    Team Members
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Header>Job Details</Dropdown.Header>
                  <Dropdown.Item as={Link} to="/interviewList">
                    Live Interviews
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/jobList">
                    Jobs List
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Button
                      variant="danger"
                      className="btn-block"
                      id="add-btn"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/candidateProfile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/jobList">
                  Jobs List
                </Nav.Link>
              </Nav>
              <Dropdown className="mr-2">
                <Dropdown.Toggle
                  variant="default"
                  className="text-light"
                  id="dropdown-basic"
                >
                  <span className="mr-1">
                    <i className="fa fa-user-circle-o fa-lg mr-2" />
                    {userData.user.name}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <DropdownItem>
                    <Button variant="danger" id="add-btn" onClick={logout}>
                      Logout
                    </Button>
                  </DropdownItem>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </>
      ) : (
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={register} variant="primary" className="mr-2">
            Sign-Up
          </Button>
          <Button onClick={login} variant="success" className="text-dark">
            Sign-In
          </Button>
        </Navbar.Collapse>
      )}
    </>
  );
};

export default AuthOptions;
