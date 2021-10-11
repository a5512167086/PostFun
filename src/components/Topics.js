import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import firebase from "../utils/Firebase";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const currentTopic = urlSearchParams.get("topic");

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
    <div className="d-flex">
      <ListGroup>
        {topics.map((topic) => {
          return (
            <ListGroup.Item
              className="d-flex justify-content-center"
              style={{ minWidth: "80px" }}
              action
              active={currentTopic === topic.name}
              as={Link}
              to={`/posts?topic=${topic.name}`}
            >
              {topic.name}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
