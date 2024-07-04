import BigNumber from "bignumber.js";
import {
  BaseContract,
  Contract,
  ContractInterface,
  ethers,
  Signer,
} from "ethers";

import { ChainKey, SUPPORTED_NETWORKS } from "../constants/networks";

export const signMessage = async (
  signer: ethers.providers.JsonRpcSigner,
  message: string
): Promise<string> => {
  return signer?.signMessage(message);
};

export const getContract = <T extends BaseContract>(
  abi: ContractInterface,
  address: string,
  signer: Signer
): T => {
  return new Contract(address, abi, signer) as T;
};

export const getNativeToken = async (
  walletAddress: string,
  netWork: ChainKey
) => {
  const rpc = SUPPORTED_NETWORKS[netWork]?.rpcUrls[0];
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const ethAmount = await provider.getBalance(walletAddress);
  return BigNumber(ethAmount.toString()).div(1e18).toString();
};
