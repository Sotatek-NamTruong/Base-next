"use client";
import useSocket from "@/hooks/useSocket";
import { useEffect } from "react";

const SocketComponent = () => {
  const { isConnected, connect, disconnect } = useSocket();
  const accessToken = "";
  useEffect(() => {
    if (accessToken) {
      connect();
    } else {
      disconnect();
    }
  }, [accessToken, isConnected]);

  return <></>;
};

export default SocketComponent;
