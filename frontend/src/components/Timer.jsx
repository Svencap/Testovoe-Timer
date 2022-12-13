import { Alert } from "react-bootstrap";

const Timer = () => {
  return (
    <Alert variant="danger" className="d-flex justify-content-center">
      <Alert.Heading className="my-0">00:02:00</Alert.Heading>
    </Alert>
  );
};

export default Timer;
