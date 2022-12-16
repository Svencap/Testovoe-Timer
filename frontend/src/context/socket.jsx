import { createContext } from "react";
import { useDispatch } from "react-redux";
import { actions as usersSlice } from "../state/slices/userSlice";

export const SocketContext = createContext({});

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  socket.on("join", (payload) => {
    const { _id, __v, name, password, participates } = payload;
    // dispatch(usersSlice.joinUser({ _id, changes: { ...payload } }));
    dispatch(usersSlice.joinUser({ id: _id, name, password, participates, __v }));
  });

  socket.on("leave", (payload) => {
    console.log(payload);
    const { _id } = payload;
    dispatch(usersSlice.leaveUser(_id));
  });


  const handleJoin = (username) => socket.emit("join", username, (response) => {
    if (response.status !== 'ok') console.log('woops :(');
  });

  const handleLeave = (username) => socket.emit('leave', username, (response) => {
    if (response.status !== 'ok') console.log('woops :(');
  })

  const socketHandles = { handleJoin, handleLeave };

  return (
    <SocketContext.Provider value={socketHandles}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
