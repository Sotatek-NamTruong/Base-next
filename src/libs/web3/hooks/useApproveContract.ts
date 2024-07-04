import { ABI_ERC20 } from "@/data";
import BigNumber from "bignumber.js";
import { constants, ContractInterface } from "ethers";
import { useContractGet } from "./useContractGet";

interface IApproveToken {
  tokenAddress: string;
  walletAddress: string;
  operatorAddress: string;
  amount: string;
}

interface IApproveContract {
  abi: ContractInterface;
  walletAddress: string;
  contractAddress: string;
  operatorAddress: string;
}

interface IApproveNft {
  abi: ContractInterface;
  contractAddress: string;
  operatorAddress: string;
  tokenId: number;
}

export const useApproveContract = () => {
  const getSmartContract = useContractGet();
  const wallet = ""; //TO REDUX

  const approveToken = async ({
    tokenAddress,
    walletAddress,
    operatorAddress,
    amount,
  }: IApproveToken) => {
    try {
      const contract = getSmartContract(
        ABI_ERC20,
        tokenAddress,
        wallet as any
      ) as any;

      const allowance = await contract.allowance(
        walletAddress,
        operatorAddress!
      );

      const lessThan = new BigNumber(allowance._hex.toString()).lt(amount || 0);

      if (lessThan) {
        const txn = await contract.approve(
          operatorAddress,
          constants.MaxUint256
        );
        await txn.wait();
        const allowance = await contract.allowance(
          walletAddress,
          operatorAddress!
        );
        const lessThan = new BigNumber(allowance._hex.toString()).lt(
          amount || 0
        );

        if (lessThan) {
          throw { code: "ENOUGH_TOKEN" };
        }
      }
    } catch (err: any) {
      throw err;
    }
  };

  const approvedForAll = async ({
    abi,
    walletAddress,
    contractAddress,
    operatorAddress,
  }: IApproveContract) => {
    try {
      const contract = getSmartContract(
        abi,
        contractAddress,
        wallet as any
      ) as any;

      const isApproved = await contract.isApprovedForAll(
        walletAddress,
        operatorAddress!
      );

      if (!isApproved) {
        const txn = await contract.setApprovalForAll(operatorAddress, true);
        await txn.wait();
      }
    } catch (error: any) {
      throw error;
    }
  };

  const approveNFT = async ({
    abi,
    contractAddress,
    operatorAddress,
    tokenId,
  }: IApproveNft) => {
    try {
      const contract = getSmartContract(
        abi,
        contractAddress,
        wallet as any
      ) as any;

      const addressApproved = await contract.getApproved(tokenId);
      if (addressApproved !== operatorAddress) {
        const txn = await contract.approve(operatorAddress, tokenId);
        await txn.wait();
      }
    } catch (error: any) {
      throw error;
    }
  };

  return { approveToken, approvedForAll, approveNFT };
};

export default useApproveContract;
