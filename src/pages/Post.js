import React, { useState, useEffect } from "react";
import { Card, Form, FormControl, Button } from "react-bootstrap";
import firebase from "../utils/Firebase";
export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("topics")
      .get()
      .then((topicSnapshot) => {
        const data = topicSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setTopics(data);
      });
  }, []);

  return (
    <div>
      <Card className="mt-5 justify-content-center ">
        <Card.Body>
          <h2 className="text-center m-4">新增貼文</h2>
          <Form>
            <Form.Group className="p-4">
              <FormControl
                type="email"
                required
                placeholder="請輸入文章標題"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></FormControl>
            </Form.Group>
            <Form.Group className="p-4">
              <Form.Control as="select">
                <option>請選擇文章主題</option>
                {topics.map((topic) => {
                  return <option>{topic.name}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group className="p-4">
              <FormControl
                as="textarea"
                rows={5}
                required
                placeholder="請輸入文章內容"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></FormControl>
            </Form.Group>
            <div className="row justify-content-center">
              <Button
                style={{ minWidth: "50px", maxWidth: "100px" }}
                type="submit"
              >
                送出
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
