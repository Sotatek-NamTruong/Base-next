"use client";

import { Notification, NotificationParams } from "@/types";
import { notification } from "antd";
import { useTranslations } from "next-intl";
import { createContext, useCallback } from "react";

export const NotificationContext = createContext<Notification>({
  error: (params: NotificationParams) => {},
  info: (params: NotificationParams) => {},
  success: (params: NotificationParams) => {},
  warning: (params: NotificationParams) => {},
});

interface NotificationProviderProps {
  children: React.ReactNode;
}

const { useNotification } = notification;

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const t = useTranslations("");
  const [rawApi, contextHolder] = useNotification({ placement: "topRight" });

  const error = useCallback(
    ({
      styleType = "standard",
      className = "",
      message,
      icon,
      description,
      ...props
    }: NotificationParams) => {
      rawApi.error({
        className: `toast-error rounded-lg ${className}`,
        style: {
          backgroundColor: "#281711",
        },
        message: (
          <p className="capitalize text-state-error text-sm relative !bottom-[2px] font-[700]">
            {message ?? t("notification.error")}
          </p>
        ),
        description: (
          <div className="text-neutral-white text-[12px]">{description}</div>
        ),
        ...props,
      });
    },
    [rawApi, t]
  );

  const info = useCallback(
    ({
      styleType = "filled",
      className,
      message,
      icon,
      ...props
    }: NotificationParams) => {
      rawApi.info({
        className,
        icon,
        message: message ?? t("notification.info"),
        ...props,
      });
    },
    [rawApi, t]
  );

  const warning = useCallback(
    ({
      styleType = "filled",
      className,
      message,
      icon,
      ...props
    }: NotificationParams) => {
      rawApi.warning({
        className,
        icon,
        message: message ?? t("notification.warning"),
        ...props,
      });
    },
    [rawApi, t]
  );

  const success = useCallback(
    ({
      styleType = "filled",
      className = "",
      message,
      icon,
      description,
      ...props
    }: NotificationParams) => {
      rawApi.success({
        className: `toast-success rounded-lg ${className}`,
        style: {
          backgroundColor: "#1C2411",
        },
        message: (
          <p className="capitalize text-state-success text-sm relative !bottom-[2px] font-[700]">
            {message ?? t("notification.success")}
          </p>
        ),

        description: (
          <div className="text-neutral-white text-[12px]">{description}</div>
        ),
        ...props,
      });
    },
    [rawApi, t]
  );

  return (
    <NotificationContext.Provider
      value={{
        rawApi,
        error,
        info,
        success,
        warning,
      }}
    >
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  );
};
