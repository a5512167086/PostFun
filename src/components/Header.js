import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../utils/Firebase";

export default function Header() {
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <div>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <h1>Post Fun</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav>
              {user ? (
                <>
                  <Nav.Link as={Link} to="/newpost">
                    新增貼文
                  </Nav.Link>
                  <Nav.Link as={Link} to="/myUser">
                    會員
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      firebase.auth().signOut();
                    }}
                  >
                    登出
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/signup">
                  註冊 / 登入
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
