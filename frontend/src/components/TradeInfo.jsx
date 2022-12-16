import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelectors } from "../state/slices/userSlice.js";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Timer from "./Timer.jsx";
import Users from "./Users.jsx";
import ModalTrade from "./ModalTrade";
import { SocketContext } from "../context/socket.jsx";

const TradeInfo = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { username } = JSON.parse(localStorage.getItem("user"));
  const participatingUser = useSelector(usersSelectors.selectAll)
        .find(({ name }) => name === username);
  const { handleJoin } = useContext(SocketContext);

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
          <Timer />
          <Card.Text>Список участников</Card.Text>
          <Users />
        </Card.Body>
        <Card.Footer className="d-flex flex-row-reverse">
          <Button
            onClick={() => setShow(true)}
            className="ms-4"
            variant={!participatingUser ? "secondary" : "primary"}
            disabled={!participatingUser}
          >
            Показать ход
          </Button>
          <Button onClick={() => handleJoin(username)}  variant="success">Присоединиться</Button>
        </Card.Footer>
      </Card>
      <ModalTrade show={show} setShow={setShow} /> 
    </>
  );
};

export default TradeInfo;
