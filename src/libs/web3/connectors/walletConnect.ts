import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

export const [walletConnect, walletConnectHooks] =
  initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
          optionalChains: [
            Number(process.env.NEXT_PUBLIC_BSC_CHAIN_ID),
            // Number(process.env.NEXT_PUBLIC_MANTA_CHAIN_ID),
          ],
          showQrModal: true,
          rpcMap: [
            String(process.env.NEXT_PUBLIC_BSC_RPC_URL),
            // String(process.env.NEXT_PUBLIC_MANTA_RPC_URL),
          ],
          metadata: {
            name: "string",
            description: "string",
            url: process.env.NEXT_PUBLIC_API_ENDPOINT!,
            icons: ["/images/logo/TYT.png"],
          },
        },
      })
  );
