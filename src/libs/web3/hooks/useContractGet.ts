import { useWeb3React } from "@web3-react/core";
import { BaseContract, ContractInterface, ethers } from "ethers";
import { ChainKey, SUPPORTED_NETWORKS } from "../constants/networks";
import { getContract } from "../helpers";

export const useContractGet = () => {
  const { provider } = useWeb3React();
  const getSmartContract = <T extends BaseContract>(
    abi: ContractInterface,
    address: string,
    netWork: ChainKey
  ): T | null => {
    if (!ethers.utils.isAddress(address)) {
      return null;
    }

    let providerRpc;
    if (!provider && netWork) {
      const rpc = SUPPORTED_NETWORKS[netWork]?.rpcUrls[0];
      providerRpc = new ethers.providers.JsonRpcProvider(rpc);
    }

    return getContract<T>(
      abi,
      address,
      (provider as any)?.getSigner() || providerRpc
    );
  };

  return getSmartContract;
};
