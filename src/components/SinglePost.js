import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Image, Button } from "react-bootstrap";
import firebase from "../utils/Firebase";
import "firebase/firestore";

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState([{}]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        setPost(data);
      });
  }, []);

  const isLiked = post.likedBy?.includes(firebase.auth().currentUser.uid);

  function toggleLike() {
    const uid = firebase.auth().currentUser.uid;
    if (isLiked) {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({
          likedBy: firebase.firestore.FieldValue.arrayRemove(uid),
        });
    } else {
      firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .update({ likedBy: firebase.firestore.FieldValue.arrayUnion(uid) });
    }
  }

  return (
    <div>
      <Card className="mt-5" style={{ width: "40rem" }}>
        <div className="d-flex m-3">
          <div>
            {post.photoUrl ? (
              <Image
                src={post.photoUrl}
                roundedCircle
                style={{ maxWidth: "30px" }}
              />
            ) : (
              <Image
                src="https://secure.gravatar.com/avatar/43e02ae5f95ee3d02d29842a4c2d73d0?s=500&d=mm&r=g"
                roundedCircle
                style={{ maxWidth: "30px" }}
              />
            )}
          </div>
          <p>{post.userName || "User"}</p>
        </div>
        <div className="row justify-content-center ">
          <Card.Img
            className="mt-1 "
            variant="top"
            src={post?.imgUrl || null}
            style={{ maxWidth: "20rem" }}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <Card.Link href={post.id}>{post.title}</Card.Link>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {post.topic}
          </Card.Subtitle>
          <Card.Text>{post.content}</Card.Text>
        </Card.Body>
        <Button
          variant={isLiked ? "secondary" : "outline-secondary"}
          onClick={toggleLike}
        >
          Like {post.likedBy?.length}
        </Button>
        <Button variant="outline-secondary">Comment</Button>
        <Card.Footer></Card.Footer>
      </Card>
    </div>
  );
}
