import React, { useState } from "react";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/SignIn";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import SinglePost from "./components/SinglePost";

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
            <Posts />
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
