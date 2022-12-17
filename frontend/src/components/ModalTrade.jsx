import { useContext } from "react";
import { useSelector } from "react-redux";
import { usersSelectors } from "../state/slices/userSlice";
import { SocketContext } from "../context/socket";

import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Timer from "./Timer";

const ModalTrade = ({ show, setShow }) => {
  const users = useSelector(usersSelectors.selectAll);
  const { username } = JSON.parse(localStorage.getItem("user"));

  const { handleLeave } = useContext(SocketContext);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Ход торгов Тестовые торги на аппарат ЛОТОС #123123
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="d-flex justify-content-between align-items-center">
          <p>ХОД</p>
          <Timer />
        </Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Параметры и требования</th>
              {users.map(({ id, name }) => (
                <td key={id}>{name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Наличие комплекса мероприятий</td>
              {users.map(({ id }) => (
                <td key={id}>-</td>
              ))}
            </tr>
            <tr>
              <td>Срок изготовления лота</td>
              {users.map(({ id }) => (
                <td key={id}>-</td>
              ))}
            </tr>
            <tr>
              <td>Гарантийные обязательста</td>
              {users.map(({ id }) => (
                <td key={id}>-</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Закрыть
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handleLeave(username);
            setShow(false);
          }}
        >
          Покинуть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTrade;
