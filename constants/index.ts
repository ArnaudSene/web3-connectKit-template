// Add smart contract addresses and abi
export const alltunes_contract_address = "0xb615089f5e0ACd56Fb48FC83045cada9b97F2f92" as `0x${string}`
export const alltunes_abi: any[] = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "ISRCRegistry_InvalideCode",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ISRCCode",
        "type": "string"
      }
    ],
    "name": "ISRCRegistry_NotBound",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "artistAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "ISRCRegistry_payArtistFailed",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ISRCCode",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "buyAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAdmin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ISRCCode",
        "type": "string"
      }
    ],
    "name": "getISRCSpec",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "minPrice",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "artistAddress",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isBound",
            "type": "bool"
          }
        ],
        "internalType": "struct ISRCRegistry.ISRCSpec",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ISRCCode",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "getUserUsage",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "listenDuration",
            "type": "uint256"
          },
          {
            "internalType": "enum ISRCRegistry.UserMode",
            "name": "mode",
            "type": "uint8"
          },
          {
            "internalType": "enum ISRCRegistry.Allowance",
            "name": "allowanceType",
            "type": "uint8"
          }
        ],
        "internalType": "struct ISRCRegistry.Usage",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "code",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "artist",
        "type": "address"
      }
    ],
    "name": "mockedCheckISRCValidity",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ISRCCode",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "minPrice",
        "type": "uint256"
      }
    ],
    "name": "setNewISRC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "ISRCCode",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "minPrice",
        "type": "uint256"
      }
    ],
    "name": "updateISRC",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const