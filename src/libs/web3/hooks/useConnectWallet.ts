import { useAppNotification } from "@/hooks/useAppNotification";
import { baseQueryApi } from "@/libs/redux/baseQueryApi";
import { useAppDispatch } from "@/libs/redux/store";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useTranslations } from "next-intl";
import { ConnectorKey, connectors } from "../connectors";
import {
  ADD_NETWORKS,
  ChainKey,
  SUPPORTED_NETWORKS,
} from "../constants/networks";
import { signMessage } from "../helpers";

/**
 * Hook for connect/disconnect to a wallet
 * @returns `connectWallet` and `disconnectWallet` functions .
 */
export const useConnectWallet = () => {
  const { connector: appConnector, provider } = useWeb3React();
  const dispatch = useAppDispatch();

  const notification = useAppNotification();
  const t = useTranslations();

  const getAccountConnected = async (provider: Web3Provider) => {
    const signer = provider.getSigner();
    const account = await signer?.getAddress();
    return account;
  };

  const getSignature = async (provider: Web3Provider) => {
    const message = process.env.NEXT_PUBLIC_MESSAGES_SIGN!;
    const signer = provider?.getSigner();
    const signature = await signMessage(signer, message);
    return {
      message,
      signature,
    };
  };

  const addNetWork = async (chain: ChainKey) => {
    const ethereum = window?.ethereum as any;
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: ADD_NETWORKS[chain]?.chainId }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          return await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...ADD_NETWORKS[chain],
              },
            ],
          });
        } catch (addError: any) {
          throw addError;
        }
      }

      throw error;
    }
  };

  async function connectWallet(connectorKey: ConnectorKey, chain: ChainKey) {
    try {
      if (connectorKey === ConnectorKey.metaMask) {
        await addNetWork(chain);
      }

      const connector = connectors[connectorKey];

      const objAddNetWork =
        connectorKey === ConnectorKey.metaMask
          ? (SUPPORTED_NETWORKS[chain] as any)
          : undefined;

      await connector?.activate(objAddNetWork);
      // dispatch(setWallet(connectorKey));
      // dispatch(setNetWork(chain));

      if (!connector.provider) {
        throw new Error("No provider found");
      }
      const provider = new Web3Provider(connector?.provider);

      const account = await getAccountConnected(provider);
      if (!account) {
        throw new Error("Account not found");
      }
      return { account };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  const connectSignMessage = async (connectorKey: ConnectorKey) => {
    const connector = connectors[connectorKey];
    if (!connector.provider) {
      throw new Error("No provider found");
    }
    const provider = new Web3Provider(connector?.provider);
    // const { message, signature } = await getSignature(provider);
    // return {
    //   message,
    //   signature,
    // };
  };

  function disconnectWallet(removeCache = true) {
    // dispatch(setLogout());
    localStorage.clear();
    appConnector.resetState();
    appConnector?.deactivate && appConnector.deactivate();
    if (removeCache) {
      dispatch(baseQueryApi.util.resetApiState());
    }
  }

  return { connectWallet, disconnectWallet, connectSignMessage };
};
