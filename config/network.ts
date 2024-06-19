import { Chain } from 'wagmi/chains'

// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
const network = process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? "testnet" : "main";


if (!projectId) throw new Error('Project ID is not defined')

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export interface IHarmonyNetwork {
    id: number
    name: string
    iconUrl: string
    nativeTokenName: string
    nativeToken: string
    nativeTokenDecimal: number
    blockExplorerName: string
    blockExplorerUrl: string
    rpcUrl: string[]
}

let networkConfig: IHarmonyNetwork;

export const HarmonyTestnet: IHarmonyNetwork = {
    id: 441,
    name: 'Harmonie',
    iconUrl: '../../../public/allfeat.png',
    nativeTokenName: 'Harmonie',
    nativeToken: 'HMY',
    nativeTokenDecimal: 18,
    blockExplorerName: 'Polkadot',
    blockExplorerUrl: 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fharmonie-endpoint-02.allfeat.io#/explorer',
    rpcUrl: ['https://harmonie-endpoint-02.allfeat.io']
}

switch (network) {
    case "testnet":
      networkConfig = HarmonyTestnet;
    default:
      networkConfig = HarmonyTestnet;
  }


export const allfeat = {
    id: networkConfig.id,
    name: networkConfig.name,
    nativeCurrency: {
      name: networkConfig.nativeTokenName,
      symbol: networkConfig.nativeToken,
      decimals: networkConfig.nativeTokenDecimal,
    },
    rpcUrls: {
      default: { http: networkConfig.rpcUrl },
    },
    blockExplorers: {
      default: {
        name: networkConfig.blockExplorerName,
        url: networkConfig.blockExplorerUrl,
      },
    },
    testnet: true
  } as const satisfies Chain