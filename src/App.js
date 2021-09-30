import React, { useState } from "react";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/SignIn";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact>
          <h1>1</h1>
        </Route>
        <Route path="/signup">
          <Container style={{ maxWidth: "600px", minWidth: "300px" }}>
            <SignUp
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
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
            />
          </Container>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
