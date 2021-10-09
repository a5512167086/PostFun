import React, { useState } from "react";
import Header from "./components/Header";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/SignIn";
import PostsPage from "./pages/PostsPage";
import NewPost from "./pages/NewPost";
import SinglePost from "./components/SinglePost";
import MyPost from "./pages/MyPost";
import MyLike from "./pages/MyLike";
import MyUser from "./pages/MyUser";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Container style={{ minWidth: "300px" }}>
            <PostsPage />
          </Container>
        </Route>
        <Route path="/signup" exact>
          <Container style={{ maxWidth: "600px", minWidth: "300px" }}>
            <SignUp
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              errMsg={errMsg}
              setErrMsg={setErrMsg}
            />
          </Container>
        </Route>
        <Route path="/signin" exact>
          <Container style={{ maxWidth: "600px", minWidth: "300px" }}>
            <LogIn
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              errMsg={errMsg}
              setErrMsg={setErrMsg}
            />
          </Container>
        </Route>
        <Route path="/newpost" exact>
          <Container style={{ maxWidth: "600px", minWidth: "300px" }}>
            <NewPost />
          </Container>
        </Route>
        <Route path="/posts/:postId" exact>
          <Container style={{ maxWidth: "600px", minWidth: "300px" }}>
            <SinglePost />
          </Container>
        </Route>
        <Route path="/myUser">
          <Container style={{ minWidth: "300px" }}>
            <Row>
              <Col className=" mt-5">
                <ButtonGroup vertical>
                  <ListGroup>
                    <ListGroupItem action as={Link} to="/myUser/info">
                      會員資料
                    </ListGroupItem>
                    <ListGroupItem action as={Link} to="/myUser/postHistory">
                      我的文章
                    </ListGroupItem>
                    <ListGroupItem action as={Link} to="/myUser/liked">
                      按讚文章
                    </ListGroupItem>
                  </ListGroup>
                </ButtonGroup>
              </Col>
              <Switch>
                <Route path="/myUser/postHistory">
                  <Col className="row justify-content-center">
                    <MyPost />
                  </Col>
                </Route>
                <Route path="/myUser/liked">
                  <Col className="row justify-content-center">
                    <MyLike />
                  </Col>
                </Route>
                <Route path="/myUser/info">
                  <Col className="row justify-content-center">
                    <MyUser />
                  </Col>
                </Route>
              </Switch>
              <Col></Col>
            </Row>
          </Container>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
