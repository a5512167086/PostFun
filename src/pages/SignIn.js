import React from "react";
import { Card, Form, Button, FormControl, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../utils/Firebase";
import "firebase/auth";

export default function SignIn(props) {
  const history = useHistory();

  function SignIn(e) {
    e.preventDefault();

    //創建User登入
    firebase
      .auth()
      .signInWithEmailAndPassword(props.email, props.password)
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        switch (e.code) {
          case "auth/invalid-email":
            props.setErrMsg("信箱格式不正確");
            break;
          case "auth/user-not-found":
            props.setErrMsg("信箱不存在");
            break;
          case "auth/wrong-password":
            props.setErrMsg("密碼錯誤");
            break;
          default:
            return null;
        }
      });

    //重製state
    props.setEmail("");
    props.setPassword("");
  }

  return (
    <div>
      <Card className="mt-5 justify-content-center ">
        <Card.Body>
          <h2 className="text-center m-3">登入</h2>
          <Form onSubmit={SignIn}>
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
              {props.errMsg && (
                <Alert className={"mt-3"} key={"warning"} variant={"warning"}>
                  {props.errMsg}
                </Alert>
              )}
            </Form.Group>
            <div className="row justify-content-center">
              <Button
                style={{ minWidth: "50px", maxWidth: "100px" }}
                type="submit"
              >
                送出
              </Button>
            </div>
            <div className="mt-5">
              還未擁有帳號嗎?
              <Button
                style={{ marginLeft: "1rem" }}
                variant="secondary"
                size="sm"
                as={Link}
                F
                to="/signup"
                onClick={() => {
                  props.setErrMsg("");
                }}
              >
                註冊
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
