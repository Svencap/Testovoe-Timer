import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import store from './state/store.js';

import { Provider } from "react-redux";

const init = async () => {
  const socket = io();

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
      <Provider store={store}>
        <App />
      </Provider>
  );
};
export default init;
