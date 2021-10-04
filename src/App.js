import React, { useState } from "react";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/SignIn";
import Homepage from "./pages/Homepage";
import Post from "./pages/Post";

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
            <Homepage />
          </Container>
        </Route>
        <Route path="/signup">
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
        <Route path="/signin">
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
        <Route path="/post">
          <Container style={{ maxWidth: "600px", minWidth: "300px" }}>
            <Post />
          </Container>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
