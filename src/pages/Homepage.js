import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Topics from "../components/Topics";
import firebase from "../utils/Firebase";

export default function Homepage() {
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
    <div className="mt-5">
      <Row>
        <Col className="d-flex justify-content-center">
          <Topics topics={topics}></Topics>
        </Col>
        <Col className="d-flex justify-content-center">主頁</Col>
        <Col></Col>
      </Row>
    </div>
  );
}
