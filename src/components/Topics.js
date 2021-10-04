import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import firebase from "../utils/Firebase";

export default function Topics() {
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
        console.log(data);
        setTopics(data);
      });
  }, []);

  return (
    <div className="d-flex">
      <ListGroup>
        {topics.map((topic) => {
          return (
            <ListGroup.Item
              className="d-flex justify-content-center"
              style={{ minWidth: "80px" }}
              action
            >
              {topic.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
