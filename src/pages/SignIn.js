import React from "react";
import { Card, Form, Button, FormControl } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../utils/Firebase";
import "firebase/auth";

export default function SignIn(props) {
  const history = useHistory();

  function onSubmit(e) {
    e.preventDefault();

    //創建User登入
    firebase
      .auth()
      .signInWithEmailAndPassword(props.email, props.password)
      .then(() => {
        history.push("/");
      });

    //重製state
    props.setEmail("");
    props.setPassword("");
  }

  return (
    <div>
      <Card className="mt-5 justify-content-center ">
        <Card.Body>
          <h2 className="text-center m-4">登入</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="p-4">
              <Form.Label>電子信箱 : </Form.Label>
              <FormControl
                type="email"
                value={props.email}
                required
                onChange={(e) => {
                  props.setEmail(e.target.value);
                }}
              ></FormControl>
            </Form.Group>
            <Form.Group className="p-4">
              <Form.Label>密碼 : </Form.Label>
              <FormControl
                value={props.password}
                type="password"
                required
                onChange={(e) => {
                  props.setPassword(e.target.value);
                }}
              ></FormControl>
            </Form.Group>
            <div className="row justify-content-center">
              <Button
                onSubmit={onSubmit}
                style={{ minWidth: "50px", maxWidth: "100px" }}
                type="submit"
              >
                送出
              </Button>
            </div>

            <div className="mt-5">
              已經擁有帳號了嗎?
              <Button
                style={{ marginLeft: "1rem" }}
                variant="secondary"
                size="sm"
                as={Link}
                to="/signup"
              >
                登入
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
