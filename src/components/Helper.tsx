"use client"

import React, { useEffect, useState } from 'react'
import { useAccount, useAccountEffect } from 'wagmi'


const Helper = () => {
    // Hook Wagmi
    const { status } = useAccount()
    
    // Account states
    const [accountAddress, setAccountAddress] = useState<`0x${string}`>("0x")
    const [accountStatus, setAccountStatus] = useState("")
    const [chainName, setChainName] = useState("")
    const [chainId, setChainId] = useState(0)
    const [currencyName, setCurrencyName] = useState("")
    const [currencySymbol, setCurrencySymbol] = useState("")
    const [currencyDecimal, setCurrencyDecimal] = useState(0)
    const [rpcUrl, setRpcUrl] = useState("")
    const [isTestnet, setIsTestnet] = useState(false)
    const [blockExplorerName, setBlockExplorerName] = useState("")
    const [blockExplorerUrl, setBlockExplorerUrl] = useState("")

    useAccountEffect({
        onConnect(data) {
            console.log('Connected!', data)
            setAccountAddress(data?.address)
            setChainName(data?.chain?.name ?? "")
            setChainId(data?.chain?.id ?? 0)
            setCurrencyName(data?.chain?.nativeCurrency?.name ?? "")
            setCurrencySymbol(data?.chain?.nativeCurrency?.symbol ?? "")
            setCurrencyDecimal(data?.chain?.nativeCurrency?.decimals ?? 0)
            setRpcUrl(data?.chain?.rpcUrls?.default?.http[0] ?? "")
            setIsTestnet(data?.chain?.testnet ?? false)
            setBlockExplorerName(data?.chain?.blockExplorers?.default?.name ?? "")
            setBlockExplorerUrl(data?.chain?.blockExplorers?.default?.url ?? "")
        },
        onDisconnect() {
          console.log('Disconnected!')
        },
    })

    useEffect(() => {
        setAccountStatus(status)
    }, [status])
       

    return (
        <div className=" m-4 p-4 text-sm font-light">
            <h1 className="font-bold p-2">ConnectKit Connect Wallet - Helper </h1>

            {/* GetClient */}
            <div className="my-1 bg-slate-950/50 p-2 rounded-md border border-slate-800 bg-slate-950 text-slate-200">
                <div className="mb-2">
                        <span>Account status : </span>
                        <span className="px-2 font-thin text-teal-300">{accountStatus}</span>
                </div>

                <div className="mb-2">
                    <span>Account address : </span>
                    <span className="px-2 font-thin text-teal-300">{accountAddress}</span>
                </div>            

                <div className="flex gap-2 ">
                    <div>
                        <span className="font-medium text-teal-300">Chain</span>
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
                        <span className="font-medium text-teal-300">nativeCurrency</span>
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
                        <span className="font-medium text-teal-300">RPC urls</span>
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