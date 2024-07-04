"use client";
import { Network } from "../types";

export enum ChainKey {
  POLYGON = "POLYGON",
  // BSC = "BSC",
  // MANTA = "MANTA",
}

export const ADD_NETWORKS: { [chain in ChainKey]: Network } = {
  [ChainKey.POLYGON]: {
    chainId: process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID_HEX,
    chainName: process.env.NEXT_PUBLIC_POLYGON_NETWORK_NAME as string,
    nativeCurrency: {
      name: process.env.NEXT_PUBLIC_POLYGON_CURRENCY as string,
      symbol: process.env.NEXT_PUBLIC_POLYGON_CURRENCY as string,
      decimals: Number(process.env.NEXT_PUBLIC_POLYGON_DECIMAL!),
    },
    blockExplorerUrls: [
      process.env.NEXT_PUBLIC_POLYGON_SCAN_BASE_URL as string,
    ],
    rpcUrls: [process.env.NEXT_PUBLIC_POLYGON_RPC_URL as string],
  },
  // [ChainKey.MANTA]: {
  //   chainId: process.env.NEXT_PUBLIC_MANTA_CHAIN_ID_HEX,
  //   chainName: process.env.NEXT_PUBLIC_MANTA_NETWORK_NAME as string,
  //   nativeCurrency: {
  //     name: process.env.NEXT_PUBLIC_MANTA_CURRENCY as string,
  //     symbol: process.env.NEXT_PUBLIC_MANTA_CURRENCY as string,
  //     decimals: Number(process.env.NEXT_PUBLIC_MANTA_DECIMAL!),
  //   },
  //   blockExplorerUrls: [process.env.NEXT_PUBLIC_MANTA_SCAN_BASE_URL as string],
  //   rpcUrls: [process.env.NEXT_PUBLIC_MANTA_RPC_URL as string],
  // },
  // [ChainKey.BSC]: {
  //   chainId: process.env.NEXT_PUBLIC_BSC_CHAIN_ID_HEX as string,
  //   chainName: process.env.NEXT_PUBLIC_BSC_NETWORK_NAME as string,
  //   rpcUrls: [process.env.NEXT_PUBLIC_BSC_RPC_URL as string],
  //   nativeCurrency: {
  //     name: process.env.NEXT_PUBLIC_BSC_CURRENCY as string,
  //     symbol: process.env.NEXT_PUBLIC_BSC_CURRENCY as string,
  //     decimals: Number(process.env.NEXT_PUBLIC_BSC_DECIMAL!),
  //   },
  //   blockExplorerUrls: [process.env.NEXT_PUBLIC_BSC_SCAN_BASE_URL as string],
  // },
};

export const SUPPORTED_NETWORKS: { [chain in ChainKey]: Network } = {
  [ChainKey.POLYGON]: {
    chainId: Number(process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID),
    chainIdHex: process.env.NEXT_PUBLIC_POLYGON_CHAIN_ID_HEX as string,
    chainName: process.env.NEXT_PUBLIC_POLYGON_NETWORK_NAME as string,
    nativeCurrency: {
      name: process.env.NEXT_PUBLIC_POLYGON_CURRENCY as string,
      symbol: process.env.NEXT_PUBLIC_POLYGON_CURRENCY as string,
      decimals: Number(process.env.NEXT_PUBLIC_POLYGON_DECIMAL!),
    },
    blockExplorerUrls: [
      process.env.NEXT_PUBLIC_POLYGON_SCAN_BASE_URL as string,
    ],
    rpcUrls: [process.env.NEXT_PUBLIC_POLYGON_RPC_URL as string],
  },
  // [ChainKey.MANTA]: {
  //   chainId: Number(process.env.NEXT_PUBLIC_MANTA_CHAIN_ID),
  //   chainIdHex: process.env.NEXT_PUBLIC_MANTA_CHAIN_ID_HEX as string,
  //   chainName: process.env.NEXT_PUBLIC_MANTA_NETWORK_NAME as string,
  //   nativeCurrency: {
  //     name: process.env.NEXT_PUBLIC_MANTA_CURRENCY as string,
  //     symbol: process.env.NEXT_PUBLIC_MANTA_CURRENCY as string,
  //     decimals: Number(process.env.NEXT_PUBLIC_MANTA_DECIMAL!),
  //   },
  //   blockExplorerUrls: [process.env.NEXT_PUBLIC_MANTA_SCAN_BASE_URL as string],
  //   rpcUrls: [process.env.NEXT_PUBLIC_MANTA_RPC_URL as string],
  // },
  // [ChainKey.BSC]: {
  //   chainId: Number(process.env.NEXT_PUBLIC_BSC_CHAIN_ID),
  //   chainIdHex: process.env.NEXT_PUBLIC_BSC_CHAIN_ID_HEX as string,
  //   chainName: process.env.NEXT_PUBLIC_BSC_NETWORK_NAME as string,
  //   nativeCurrency: {
  //     name: process.env.NEXT_PUBLIC_BSC_CURRENCY as string,
  //     symbol: process.env.NEXT_PUBLIC_BSC_CURRENCY as string,
  //     decimals: Number(process.env.NEXT_PUBLIC_BSC_DECIMAL!),
  //   },
  //   blockExplorerUrls: [process.env.NEXT_PUBLIC_BSC_SCAN_BASE_URL as string],
  //   rpcUrls: [process.env.NEXT_PUBLIC_BSC_RPC_URL as string],
  // },
};

export const SUPPORTED_CHAIN_HEX = Object.keys(ChainKey).map(
  (key) => (SUPPORTED_NETWORKS as any)[key]?.chainIdHex
);

export const SUPPORTED_CHAIN_ID = Object.keys(ChainKey).map(
  (key) => (SUPPORTED_NETWORKS as any)[key]?.chainId
);

export const SUPPORTED_CHAIN_NAME = Object.keys(ChainKey).map(
  (key) => (SUPPORTED_NETWORKS as any)[key]?.chainName
);
