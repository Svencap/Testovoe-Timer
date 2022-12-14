import { useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Timer from "./Timer";
import Users from "./Users";
import ModalTrade from "./ModalTrade";

const TradeInfo = () => {
  const [show, setShow] = useState(false);
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
          <Button onClick={() => setShow(true)} variant="primary">Присоединиться</Button>
        </Card.Footer>
      </Card>
      <ModalTrade show={show} setShow={setShow} />
    </>
  );
};

export default TradeInfo;