import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, Form, Image } from "react-bootstrap";
import firebase from "../utils/Firebase";

function MyName({ user }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);
  const [displayName, setDisplayName] = useState("");

  function updateUserName() {
    user.updateProfile({ displayName }).then(() => {
      setDisplayName("");
      setModalOpen(false);
    });
  }

  return (
    <Row className="mt-5" style={{ width: "50rem" }}>
      <Col>
        <h4>會員名稱 : {user?.displayName || "請設定使用者名稱"} </h4>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button size="sm" onClick={handleShow}>
          編輯名稱
        </Button>
      </Col>
      <Modal show={modalOpen} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>更改使用者名稱</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="輸入新的使用者名稱"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉視窗
          </Button>
          <Form.Group>
            <Button variant="primary" onClick={(handleClose, updateUserName)}>
              儲存
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

function MyPhoto({ user }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);
  const [imgFile, setImgFile] = useState(null);
  const previewImgUrl = imgFile ? URL.createObjectURL(imgFile) : user?.photoUrl;

  function updateUserPhoto() {
    const fileRef = firebase.storage().ref("user-photo/" + user.uid);
    const metadata = {
      contentType: imgFile.type,
    };
    fileRef.put(imgFile, metadata).then(() => {
      fileRef.getDownloadURL().then((imgUrl) => {
        user
          .updateProfile({
            photoURL: imgUrl,
          })
          .then(() => {
            setImgFile(null);
            setModalOpen(false);
          });
      });
    });
  }

  return (
    <Row className="mt-5">
      <Col>
        <h4>會員照片 : </h4>
        <Image src={user?.photoURL} style={{ maxWidth: "50px" }} />
      </Col>
      <Col className="d-flex justify-content-end">
        <Button size="sm" onClick={handleShow}>
          變更照片
        </Button>
      </Col>
      <Modal show={modalOpen} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>更換會員照片</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Control
                type="file"
                size="sm"
                onChange={(e) => {
                  setImgFile(e.target.files[0]);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉視窗
          </Button>
          <Form.Group>
            <Button variant="primary" onClick={updateUserPhoto}>
              儲存
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

function MyPassword({ user }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);

  return (
    <Row className="mt-5">
      <Col>
        <h4>會員密碼 : *********</h4>
      </Col>
      <Col className="d-flex justify-content-end">
        <Button size="sm" onClick={handleShow}>
          更改密碼
        </Button>
      </Col>
      <Modal show={modalOpen} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>變更密碼</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="輸入新的密碼" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉視窗
          </Button>
          <Form.Group>
            <Button variant="primary" onClick={handleClose}>
              儲存
            </Button>{" "}
          </Form.Group>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}

export default function MyUser() {
  const [user, setUser] = useState({});
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div className="mt-5">
      <Row>
        <h2>會員資料</h2>
        <MyName user={user} />
        <MyPhoto user={user} />
        <MyPassword user={user} />
      </Row>
    </div>
  );
}
