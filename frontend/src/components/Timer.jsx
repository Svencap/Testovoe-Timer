import { useEffect, useState, useContext } from "react";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import { updateTimer } from "../state/slices/timerSlice";
import { usersSelectors } from "../state/slices/userSlice";
import { SocketContext } from "../context/socket";

const Timer = () => {

  const time = useSelector((state) => state.timer.time);

  // const dispatch = useDispatch();
  const { startTimer } = useContext(SocketContext);


  // const [time, setTime] = useState(60);

  const sliceTimer = (time) => String(time).padStart(2, '0');

  const minutes = sliceTimer(Math.floor(time / 60));
  const seconds = sliceTimer(time - minutes * 60);

  const { username } = JSON.parse(localStorage.getItem('user'));
  const users = useSelector(usersSelectors.selectAll).find(({ name }) => name === username);
  
  useEffect(() => {
    if (users) {
      const intervalId = setInterval(() => {
        const newTime = time >= 1 ? time - 1 : 0;
        startTimer(newTime);
        // dispatch(updateTimer(newTime));
        // setTime((time) => time >= 1 ? time - 1 : 0);
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
