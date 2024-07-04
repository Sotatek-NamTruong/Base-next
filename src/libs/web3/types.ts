export type Network = {
  chainId?: number | string;
  chainIdHex?: string;
  rpcUrls: string[];
  chainName: string;
  nativeCurrency: { name: string; decimals: number; symbol: string };
  blockExplorerUrls: string[];
};
