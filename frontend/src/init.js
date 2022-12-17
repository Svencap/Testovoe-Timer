import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import store from "./state/store.js";

import { Provider } from "react-redux";
import SocketProvider from "./context/socket.jsx";

const init = async () => {
  const socket = io('https://timer-0dus.onrender.com');

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    </Provider>
  );
};
export default init;
