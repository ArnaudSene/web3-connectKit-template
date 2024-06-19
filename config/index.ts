import { createConfig, http } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { sepolia, mainnet } from "wagmi/chains";


export const config = createConfig(
    getDefaultConfig({
      // Your dApps chains
      chains: [sepolia, mainnet],
      transports: {
        // RPC URL for each chain
        [sepolia.id]: http(
          `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
        ),
        [mainnet.id]: http(
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
        ),
      },
  
      // Required API Keys
      walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
  
      // Required App Info
      appName: "web3-connect-kit template",
  
      // Optional App Info
      appDescription: "Your App Description",
      appUrl: "https://family.co", // your app's url
      appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
  )