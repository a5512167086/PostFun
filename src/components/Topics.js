import React from "react";
import { ListGroup } from "react-bootstrap";

export default function Topics(props) {
  return (
    <div className="d-flex">
      <ListGroup>
        {props.topics.map((topic) => {
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
