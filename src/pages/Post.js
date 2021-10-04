import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  FormControl,
  Button,
  Image,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router";
import firebase from "../utils/Firebase";
import "firebase/firestore";
import "firebase/storage";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const previewImg = img
    ? URL.createObjectURL(img)
    : "https://www.visa.co.uk/dam/VCOM/placeholder-image.png";

  function newPost(e) {
    e.preventDefault();
    setLoading(true);

    const postRef = firebase.firestore().collection("posts").doc();
    const imgRef = firebase.storage().ref("post-img/" + postRef.id);
    const metadata = {
      contentType: img.type,
    };

    imgRef.put(img, metadata).then(() => {
      imgRef.getDownloadURL().then((imgUrl) => {
        postRef
          .set({
            title,
            content,
            topic: topicName,
            imgUrl,
            postTime: firebase.firestore.Timestamp.now(),
            author: {
              userName: firebase.auth().currentUser.displayName || "",
              photoUrl: firebase.auth().currentUser.photoURL || "",
              uid: firebase.auth().currentUser.uid,
              email: firebase.auth().currentUser.email,
            },
          })
          .then(() => {
            setLoading(false);
            history.push("/");
          });
      });
    });
  }

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
          <h2 className="text-center pt-3">新增貼文</h2>{" "}
          <Form onSubmit={newPost}>
            <div className="pt-2 row justify-content-center">
              <Image src={previewImg} fluid />
            </div>
            <Form.Group controlId="formFile" className="pt-3">
              <Form.Control
                type="file"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
              />
            </Form.Group>
            <Form.Group className="pt-3">
              <FormControl
                type="text"
                required
                placeholder="請輸入文章標題"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></FormControl>
            </Form.Group>
            <Form.Group className="pt-3">
              <Form.Control
                as="select"
                type="text"
                required
                value={topicName}
                onChange={(e) => {
                  setTopicName(e.target.value);
                }}
              >
                <option>請選擇文章主題</option>
                {topics.map((topic) => {
                  return <option>{topic.name}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <Form.Group className="pt-3">
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
            <div className="pt-3 row justify-content-center">
              <Button
                type="submit"
                style={{ minWidth: "50px", maxWidth: "100px" }}
                onLoad={loading}
              >
                {loading ? (
                  <Spinner
                    as="span"
                    variant="light"
                    size="sm"
                    role="status"
                    animation="border"
                  ></Spinner>
                ) : (
                  "送出"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
