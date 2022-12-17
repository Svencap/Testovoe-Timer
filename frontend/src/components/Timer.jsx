import { useEffect, useContext } from "react";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
// import { updateTimer } from "../state/slices/timerSlice";
import { usersSelectors } from "../state/slices/userSlice";
import { SocketContext } from "../context/socket";

const Timer = () => {
  const time = useSelector((state) => state.timer.time);

  // const dispatch = useDispatch();
  const { startTimer } = useContext(SocketContext);

  const sliceTimer = (time) => String(time).padStart(2, "0");

  const minutes = sliceTimer(Math.floor(time / 60));
  const seconds = sliceTimer(time - minutes * 60);

  const { username } = JSON.parse(localStorage.getItem("user"));
  const participatingUsers = useSelector(usersSelectors.selectAll);
  console.log(participatingUsers);
  const currentUser = participatingUsers.find(({ name }) => name === username);

  useEffect(() => {
    let intervalId;
    // if (!participatingUsers.length) {
    //   localStorage.removeItem("timer");
    //   localStorage.setItem("timer", 120);
    //   dispatch(updateTimer(120));
    // }
    if (currentUser) {
      intervalId = setInterval(() => {
        const newTime = time >= 1 ? time - 1 : 0;
        localStorage.setItem("timer", time);
        if (Number(localStorage.getItem("timer")) === 0) {
          localStorage.setItem("timer", 120);
          return clearInterval(intervalId);
        }
        startTimer(newTime);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [time, currentUser, startTimer]);

  return (
    <Alert variant="danger" className="d-flex justify-content-center">
      <Alert.Heading className="my-0">
        00:{minutes}:{seconds}
      </Alert.Heading>
    </Alert>
  );
};

export default Timer;
