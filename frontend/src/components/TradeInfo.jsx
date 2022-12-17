import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelectors } from "../state/slices/userSlice.js";
import { Alert } from "react-bootstrap";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Timer from "./Timer.jsx";
import Users from "./Users.jsx";
import ModalTrade from "./ModalTrade";
import { SocketContext } from "../context/socket.jsx";

const TradeInfo = () => {
  const [show, setShow] = useState(false);
  // const dispatch = useDispatch();
  const { username } = JSON.parse(localStorage.getItem("user"));
  const isParticipatingUser = useSelector(usersSelectors.selectAll).find(
    ({ name }) => name === username
  );
  const { handleJoin, handleLeave } = useContext(SocketContext);

  return (
    <>
      <Card
        bg="light"
        text="dark"
        style={{ width: "30rem" }}
        className="mb-2 px-0"
      >
        <Card.Header>Торг на аппарат ЛОТОС #123123</Card.Header>
        <Card.Body>
          {isParticipatingUser ? (
            <Timer />
          ) : (
            <Alert variant="info" className="d-flex justify-content-center">
              Вы не участвуете
            </Alert>
          )}
          <Card.Text>Список участников</Card.Text>
          <Users />
        </Card.Body>
        <Card.Footer className="d-flex flex-row-reverse">
          <Button
            onClick={() => setShow(true)}
            className="ms-4"
            variant={!isParticipatingUser ? "secondary" : "primary"}
            disabled={!isParticipatingUser}
          >
            Показать ход
          </Button>
          {!isParticipatingUser ? (
            <Button onClick={() => handleJoin(username)} variant="success">
              Присоединиться
            </Button>
          ) : (
            <Button onClick={() => handleLeave(username)} variant="danger">
              Покинуть
            </Button>
          )}
        </Card.Footer>
      </Card>
      <ModalTrade show={show} setShow={setShow} />
    </>
  );
};

export default TradeInfo;
