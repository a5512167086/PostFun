import React from "react";
import { Card, Form, Button, FormControl, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../utils/Firebase";
import "firebase/auth";

export default function SignUp(props) {
  const history = useHistory();

  function SignUp(e) {
    e.preventDefault();

    //創建User
    firebase
      .auth()
      .createUserWithEmailAndPassword(props.email, props.password)
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        switch (e.code) {
          case "auth/email-already-in-use":
            props.setErrMsg("信箱已存在");
            break;
          case "auth/invalid-email":
            props.setErrMsg("信箱格式錯誤");
            break;
          case "auth/weak-password":
            props.setErrMsg("密碼強度不足");
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
          <h2 className="text-center m-3">註冊</h2>
          <Form onSubmit={SignUp}>
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
              {props.errMsg ? (
                <Alert className={"mt-3"} key={"warning"} variant={"warning"}>
                  {props.errMsg}
                </Alert>
              ) : (
                ""
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
              已經擁有帳號了嗎?
              <Button
                style={{ marginLeft: "1rem" }}
                variant="secondary"
                size="sm"
                as={Link}
                to="/signin"
                onClick={() => {
                  props.setErrMsg("");
                }}
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
