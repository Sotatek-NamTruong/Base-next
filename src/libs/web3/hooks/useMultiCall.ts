import {
  ContractCallContext,
  ContractCallResults,
  Multicall,
} from "ethereum-multicall";
import { ethers } from "ethers";
import { ChainKey, SUPPORTED_NETWORKS } from "../constants/networks";

const useMultiCall = () => {
  const handleMultiCall = async (
    contractCallContext: ContractCallContext[],
    netWork: ChainKey
  ) => {
    try {
      const rpc = SUPPORTED_NETWORKS[netWork]?.rpcUrls[0];
      const providerRpc = new ethers.providers.JsonRpcProvider(rpc);
      const multiCall = new Multicall({
        ethersProvider: providerRpc,
        tryAggregate: true,
      });

      const { results }: ContractCallResults = await multiCall.call(
        contractCallContext
      );
      return results;
    } catch (error: any) {
      console.log(error);
    }
  };
  return {
    handleMultiCall,
  };
};

export default useMultiCall;
