import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { usersSelectors } from "../state/slices/userSlice";

const Timer = () => {

  const [time, setTime] = useState(60);

  const sliceTimer = (time) => String(time).padStart(2, '0');

  const minutes = sliceTimer(Math.floor(time / 60));
  const seconds = sliceTimer(time - minutes * 60);

  const { username } = JSON.parse(localStorage.getItem('user'));
  const users = useSelector(usersSelectors.selectAll).find(({ name }) => name === username);
  
  useEffect(() => {
    if (users) {
      const intervalId = setInterval(() => {
        setTime((time) => time >= 1 ? time - 1 : 0);
      }, 1000)
      return () => clearInterval(intervalId);
    }
  }, [time, users])

  return (
    <Alert variant="danger" className="d-flex justify-content-center">
      <Alert.Heading className="my-0">00:{minutes}:{seconds}</Alert.Heading>
    </Alert>
  );
};

export default Timer;
