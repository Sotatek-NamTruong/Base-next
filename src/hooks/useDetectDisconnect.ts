import { useEffect } from "react";

interface IDetectDisconnect {
  eventDetect: () => void;
}

const useDetectDisconnect = ({ eventDetect }: IDetectDisconnect) => {
  const wrongNetWork = ""; // TO REDUX
  const userInfo = ""; // TO REDUX

  useEffect(() => {
    if (wrongNetWork || !userInfo) {
      eventDetect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrongNetWork, userInfo]);
};

export default useDetectDisconnect;
