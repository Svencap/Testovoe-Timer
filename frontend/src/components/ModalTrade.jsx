import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import Timer from "./Timer";

const ModalTrade = ({ show, setShow }) => {
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
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Наличие комплекса мероприятий</td>
              <td>Mark</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>Срок изготовления лота</td>
              <td>Jacob</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <td>Гарантийные обязательста</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
            <tr>
              <td>Условия опталы</td>
              <td>-</td>
              <td>-</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>
          Закрыть
        </Button>
        <Button variant="danger">Покинуть торги</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTrade;
