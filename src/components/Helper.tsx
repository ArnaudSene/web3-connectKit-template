"use client"

import React, { useEffect, useState } from 'react'
import { Evaluate } from 'viem/_types/types/utils'
import { useAccount, useAccountEffect } from 'wagmi'
import { GetAccountReturnType } from 'wagmi/actions'


const Helper = () => {
    // Hook Wagmi
    const { status } = useAccount()
        
    // Account states
    const [accountAddress, setAccountAddress] = useState<`0x${string}`>("0x")
    const [accountStatus, setAccountStatus] = useState("NA")
    const [chainName, setChainName] = useState("NA")
    const [chainId, setChainId] = useState(0)
    const [currencyName, setCurrencyName] = useState("NA")
    const [currencySymbol, setCurrencySymbol] = useState("NA")
    const [currencyDecimal, setCurrencyDecimal] = useState(0)
    const [rpcUrl, setRpcUrl] = useState("NA")
    const [isTestnet, setIsTestnet] = useState(false)
    const [blockExplorerName, setBlockExplorerName] = useState("NA")
    const [blockExplorerUrl, setBlockExplorerUrl] = useState("NA")

    const connect = (
        data: Evaluate<Pick<Extract<GetAccountReturnType, {status: "connected";}>,
            "address" | "addresses" | "chain" | "chainId" | "connector"> & 
            { isReconnected: boolean; }>
    ) => {
        setAccountAddress(data?.address)
        setChainName(data?.chain?.name ?? "NA")
        setChainId(data?.chain?.id ?? 0)
        setCurrencyName(data?.chain?.nativeCurrency?.name ?? "NA")
        setCurrencySymbol(data?.chain?.nativeCurrency?.symbol ?? "NA")
        setCurrencyDecimal(data?.chain?.nativeCurrency?.decimals ?? 0)
        setRpcUrl(data?.chain?.rpcUrls?.default?.http[0] ?? "NA")
        setIsTestnet(data?.chain?.testnet ?? false)
        setBlockExplorerName(data?.chain?.blockExplorers?.default?.name ?? "NA")
        setBlockExplorerUrl(data?.chain?.blockExplorers?.default?.url ?? "NA")
    }

    const disconnect = () => {
        setAccountAddress("0x")
            setChainName("NA")
            setChainId(0)
            setCurrencyName("NA")
            setCurrencySymbol("NA")
            setCurrencyDecimal(0)
            setRpcUrl("NA")
            setIsTestnet(false)
            setBlockExplorerName("NA")
            setBlockExplorerUrl("NA")
    }

    useAccountEffect({
        onConnect(data) {
            connect(data)
        },
        onDisconnect() {
            disconnect()
        },
    })

    useEffect(() => {
        setAccountStatus(status)
    }, [status])
       

    return (
        <div className="flex flex-col m-4 p-4 text-sm font-light items-center">
           <div className='mb-4'>
                <h1 className="font-bold py-2 mb-2 text-lg">ConnectKit Connect Wallet - Helper </h1>
                <div className='flex flex-col items-center'>For this example you can switch your network between 
                    <p className='text-amber-300'> Ethereun Mainnet </p>
                    <p className='text-amber-300'> Ethereum Sepolia testnet</p>
                </div>
           </div>
            {/* GetClient */}
            <div className="my-1 bg-slate-950/50 p-8 rounded-lg border border-slate-600 bg-slate-950 text-slate-200">
                <div>
                    <span>Account status : </span>
                    <span className="px-2 text-teal-300">{accountStatus}</span>
                </div>

                <div className="mb-2">
                    <span>Account address : </span>
                    <span className="px-2 text-teal-300">{accountAddress}</span>
                </div>            

                <div className="flex gap-12 ">
                    <div>
                        <span className="font-medium text-indigo-400">Chain</span>
                        <div>
                            <span className="pr-2">Chain ID : </span>
                            <span className="font-thin text-sm text-pink-500">{chainId}</span>
                        </div>
                        <div>
                            <span className="pr-2">Name : </span>
                            <span className="font-thin text-sm text-pink-500">{chainName}</span>
                        </div>
                    </div>						

                    <div>
                        <span className="font-medium text-indigo-400">nativeCurrency</span>
                        <div>
                            <span className="pr-2">Name : </span>
                            <span className="font-thin text-sm text-pink-500">{currencyName}</span>
                        </div>
                        <div>
                            <span className="pr-2">Symbol : </span>
                            <span className="font-thin text-sm text-pink-500">{currencySymbol}</span>
                        </div>
                        <div>								
                            <span className="pr-2">Decimals : </span>
                            <span className="font-thin text-sm text-pink-500">{currencyDecimal}</span>
                        </div>
                    </div>

                    <div>
                        <span className="font-medium text-indigo-400">RPC urls</span>
                        <div>
                            <span className="pr-2">URL : </span>
                            <span className="font-thin text-sm text-pink-500">{rpcUrl}</span>
                        </div>
                        <div>
                            <span className="pr-2">Tesnet : </span>
                            <span className="font-thin text-sm text-pink-500">{String(isTestnet)}</span>
                        </div>

                        <div>
                            <span className="pr-2">Block Explorers name : </span>
                            <span className="font-thin text-sm text-pink-500">{blockExplorerName}</span>
                        </div>
                        <div>
                            <span className="pr-2">Block Explorers url : </span>
                            <span className="font-thin text-sm text-pink-500 text-ellipsis">{blockExplorerUrl}</span>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default Helper