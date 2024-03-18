import socketio from "socket.io-client";
import React from "react";
import { getEnvKey } from "./envUtils";
const wsBaseUrl = getEnvKey("REACT_APP_WS_BASE_URL", "ws://localhost:3100");

export const socket = socketio.connect(wsBaseUrl, {
  transports: ["websocket"],
});
export const SocketContext = React.createContext();
