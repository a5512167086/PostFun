import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Image, Button, Form } from "react-bootstrap";
import firebase from "../utils/Firebase";
import "firebase/firestore";

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState([{}]);
  const [commentContent, setCommentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const isLiked = post.likedBy?.includes(firebase.auth().currentUser.uid);

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        setPost(data);
      });
  });

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("commentTime")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        console.log(data);
        setComments(data);
      });
  });

  function toggleLike(e) {
    e.preventDefault();

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

  function sendComment(e) {
    e.preventDefault();
    setLoading(true);

    const firestore = firebase.firestore();
    const batch = firestore.batch();
    const postRef = firestore.collection("posts").doc(postId);
    const commentRef = postRef.collection("comments").doc();

    batch.update(postRef, {
      commentsCount: firebase.firestore.FieldValue.increment(1),
    });

    batch.set(commentRef, {
      content: commentContent,
      commentTime: firebase.firestore.Timestamp.now(),
      author: {
        uid: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName || "",
        photoUrl: firebase.auth().currentUser.photoURL || "",
      },
    });
    batch.commit().then(() => {
      setCommentContent("");
      setLoading(false);
    });
  }

  return (
    <div>
      <Card className="mt-5" style={{ width: "40rem" }}>
        <div className="d-flex ">
          <div>
            {post.photoUrl ? (
              <Image
                src={post.photoUrl}
                roundedCircle
                style={{ maxWidth: "40px" }}
              />
            ) : (
              <Image
                src="https://secure.gravatar.com/avatar/43e02ae5f95ee3d02d29842a4c2d73d0?s=500&d=mm&r=g"
                roundedCircle
                style={{ maxWidth: "40px" }}
              />
            )}
          </div>
          <p className="m-2">{post.userName || "User"}</p>
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
        <Card.Footer>
          <Form className="mt-3">
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                required
                rows={4}
                value={commentContent}
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
              />
            </Form.Group>
            {loading ? (
              <Button onClick={sendComment} disabled>
                傳送中
              </Button>
            ) : (
              <Button onClick={sendComment}>留言</Button>
            )}
          </Form>
        </Card.Footer>
      </Card>
      <h3 className="mt-3">共{post.commentsCount}則留言</h3>
      {comments.map((comment) => {
        return (
          <Card style={{ width: "40rem" }}>
            <div className=" d-flex">
              <Image
                variant="top"
                src={
                  comment.photoURL ||
                  "https://secure.gravatar.com/avatar/43e02ae5f95ee3d02d29842a4c2d73d0?s=500&d=mm&r=g"
                }
                style={{ maxWidth: "40px" }}
                roundedCircle
              />
              <p className="m-2">{comment.displayName || "User"}</p>
            </div>
            <Card.Body>
              <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
              {comment.commentTime.toDate().toLocaleString()}
            </Card.Footer>
          </Card>
        );
      })}
    </div>
  );
}
