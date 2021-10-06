import React from "react";
import { Col, Image, Card, Button } from "react-bootstrap";

export default function Post({ post }) {
  return (
    <div>
      <Col className="d-flex justify-content-center">
        <Col>
          <Card className="mt-5" style={{ width: "40rem" }}>
            <div className="d-flex m-3">
              <div>
                <Image
                  src={
                    post.photoUrl ||
                    "https://secure.gravatar.com/avatar/43e02ae5f95ee3d02d29842a4c2d73d0?s=500&d=mm&r=g"
                  }
                  roundedCircle
                  style={{ maxWidth: "30px" }}
                />
              </div>
              <p>{post.userName || "User"}</p>
            </div>
            <div className="row justify-content-center ">
              <Card.Img
                className="mt-1 "
                variant="top"
                src={post.imgUrl || null}
                style={{ maxWidth: "20rem" }}
              />
            </div>
            <Card.Body>
              <Card.Title>
                <Card.Link href={`/posts/${post.id}`}>{post.title}</Card.Link>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {post.topic}
              </Card.Subtitle>
              <Card.Text>{post.content}</Card.Text>
            </Card.Body>
            <Button disabled variant="outline-secondary">
              Like {post.likedBy?.length || 0}
            </Button>
            <Button disabled variant="outline-secondary">
              Comment {post.commentsCount || 0}
            </Button>
            <Card.Footer className="text-muted">
              {post.postTime?.toDate().toLocaleTimeString()}
            </Card.Footer>
          </Card>
        </Col>
      </Col>
    </div>
  );
}
