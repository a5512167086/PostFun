import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import firebase from "../utils/Firebase";
import Post from "../components/Post";

export default function MyPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .where("likedBy", "array-contains", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((docSnapshot) => {
          const id = docSnapshot.id;
          return { ...docSnapshot.data(), id };
        });
        setPosts(data);
      });
  }, []);

  return (
    <div className="mt-5">
      <Row>
        <h2>按讚的內容</h2>
        <Col className="d-flex justify-content-center">
          <Col>
            {posts.map((post) => {
              return <Post post={post} />;
            })}
          </Col>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}
