/* eslint-disable react-hooks/exhaustive-deps */
import { baseQueryApi } from "@/libs/redux/baseQueryApi";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { ConnectorKey } from "../connectors";
import { metaMask } from "../connectors/metamask";
import { walletConnect } from "../connectors/walletConnect";
import { useConnectWallet } from "./useConnectWallet";

/**
 * Trying eager connect to connectors at first time.
 * @returns `tried` tried eager connect done or not
 */
export function useEagerConnect() {
  const { isActive, chainId, account, provider } = useWeb3React();

  const { disconnectWallet } = useConnectWallet();

  const wallet: any = ""; // get redux

  const handleClearData = () => {
    disconnectWallet();
    baseQueryApi.util.resetApiState();
  };

  useEffect(() => {
    const ethereum = (window as any)?.ethereum;

    if (!isActive && ethereum) {
      if (wallet === ConnectorKey.walletConnect) {
        walletConnect
          .connectEagerly()
          .then(() => {})
          .catch(() => {
            handleClearData();
          });
      } else if (wallet === ConnectorKey.metaMask) {
        (ethereum?._metamask || ethereum?.providers?.[0]?._metamask)
          ?.isUnlocked()
          .then((isUnlock: any) => {
            if (isUnlock) {
              metaMask.connectEagerly().then(() => {});
            } else {
              handleClearData();
            }
          });
      }
      return;
    }
  }, []);
}
