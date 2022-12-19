import { useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/socket";

const Timer = () => {
  const time = useSelector((state) => state.timer.time);

  const { startTimer } = useContext(SocketContext);

  const sliceTimer = (time) => String(time).padStart(2, "0");

  const minutes = sliceTimer(Math.floor(time / 60));
  const seconds = sliceTimer(time - minutes * 60);

  useEffect(() => {
    let intervalId;
      intervalId = setInterval(() => {
        const newTime = time >= 1 ? time - 1 : 0;
        localStorage.setItem("timer", time);
        if (Number(localStorage.getItem("timer")) === 0) {
          localStorage.setItem("timer", 120);
          return clearInterval(intervalId);
        }
        startTimer(newTime);
      }, 1000);
    return () => clearInterval(intervalId);
  }, [time, startTimer]);

  return (
    <Alert variant="danger" className="d-flex justify-content-center">
      <Alert.Heading className="my-0">
        00:{minutes}:{seconds}
      </Alert.Heading>
    </Alert>
  );
};

export default Timer;
