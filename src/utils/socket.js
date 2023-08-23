import socketio from "socket.io-client";
import React from "react";

const wsBaseUrl =
  process.env.REACT_APP_WS_BASE_URL ||
  (window._env_ || {}).REACT_APP_WS_BASE_URL ||
  "ws://localhost:3100";

export const socket = socketio.connect(wsBaseUrl, {
  transports: ["websocket"],
});
export const SocketContext = React.createContext();
