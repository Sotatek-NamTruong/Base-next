import { useWeb3React } from "@web3-react/core";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { SUPPORTED_CHAIN_HEX, SUPPORTED_CHAIN_ID } from "../constants/networks";
import { useConnectWallet } from "./useConnectWallet";

export function useWalletListener() {
  const { connector, account, chainId } = useWeb3React();
  const userInfo = null;
  const { disconnectWallet } = useConnectWallet();

  const dispatch = useDispatch();

  const accountRef = useRef<string>();

  const handleLogout = (accounts: string[], removeCache = true) => {
    if (accounts[0] !== accountRef.current) {
      disconnectWallet(removeCache);
    }
    accountRef.current = accounts[0];
  };

  const handleChainChange = (chainHex: string) => {
    if (!SUPPORTED_CHAIN_HEX?.includes(chainHex)) {
      // disconnectWallet(true);
      // dispatch(setWrongNetWork(true));
    }
    if (SUPPORTED_CHAIN_HEX?.includes(chainHex)) {
      // disconnectWallet(true);
      // dispatch(setWrongNetWork(false));
    }
  };

  useEffect(() => {
    if (chainId && !SUPPORTED_CHAIN_ID.includes(chainId) && account) {
      // dispatch(setWrongNetWork(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account]);

  useEffect(() => {
    if (account) {
      accountRef.current = account;
    }
  }, [account]);

  useEffect(() => {
    if (account && connector && connector.provider) {
      connector.provider?.on("chainChanged", handleChainChange);
      connector.provider?.on("accountsChanged", handleLogout);
    } else {
      connector.provider?.removeListener("chainChanged", handleChainChange);
      connector.provider?.removeListener("accountsChanged", handleLogout);
    }

    if (window) {
      (window as any).logout = handleLogout;
    }

    return () => {
      connector.provider?.removeListener("chainChanged", handleChainChange);
      connector.provider?.removeListener("accountsChanged", handleLogout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connector.provider, account]);
}
