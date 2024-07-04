import { NotificationContext } from "@/libs/antd/NotificationProvider";
import { useContext } from "react";

export const useAppNotification = () => useContext(NotificationContext);
