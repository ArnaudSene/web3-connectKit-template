"use client"

import React, { useEffect, useState } from 'react'
import { 
    buyAllowance, 
    getAdmin, 
    getISRCSpec, 
    getUserUsage, 
    I_ISRCSpec, 
    I_UserUsage, 
    mockedCheckISRCValidity, 
} from '../../utils/allfeat_isrc'
import { 
    useAccount,
    useAccountEffect,
} from 'wagmi'



const DEFAULT_ISRC_SPEC: I_ISRCSpec = {
	minPrice: BigInt(0),
	artistAddress: "0x",
	isBound: false
}

const DEFAULT_USER_USAGE: I_UserUsage = {
	listenDuration: BigInt(0),
	mode: 0,
	allowanceType: 0
}

const Helper = () => {
    // Hook Wagmi
    const { address, status } = useAccount()
    
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

    // States
	const [admin, setAdmin] = useState<`0x${string}`>("0x0")
	const [artist, setArtist] = useState<`0x${string}`>("0x0")
	const [ISRCCode, setISRCCode] = useState<any>("no ISRC code")
	const [ISRCSpec, setISRCSpec] = useState<I_ISRCSpec>(DEFAULT_ISRC_SPEC)
	const [userUsage, setUserUsage] = useState<I_UserUsage>(DEFAULT_USER_USAGE)
	const [userAddr, setUserAddr] = useState<`0x${string}`>("0x")
	const [allowanceAmount, setAllowanceAmount] = useState(0)

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
       


    const handleGetAdmin = () => {
		// Get the Admin of the Alltunes contract
		getAdmin(address as `0x${string}`)
			.then((result => { setAdmin(result as `0x${string}`) }))
			.catch(err => { console.log("error : ", err) })
	}

	const handleGetISRCSpec = () => {
		if (ISRCCode) {
			console.log("ISRCCode : ", ISRCCode)
			// 
			getISRCSpec(address as `0x${string}`, ISRCCode)
				.then((ISRCSpec => { 
					console.log("result received ISRCSpec : ", ISRCSpec)
					setISRCSpec(ISRCSpec as I_ISRCSpec) 
				}))
				.catch(err => { console.log("error : ", err) })
		} else {
			setISRCCode("please enter a valid ISRC Code")
			setISRCSpec(DEFAULT_ISRC_SPEC)
		}
	}

	const handleGetUserUsage = () => {
		if (ISRCCode && userAddr)  {
			console.log("ISRCCode : ", ISRCCode)
			// 
			getUserUsage(userAddr as `0x${string}`, ISRCCode)
				.then((UserUsage => { 
					console.log("result received UserUsage : ", UserUsage)
					setUserUsage(UserUsage as I_UserUsage) 
				}))
				.catch(err => { console.log("error : ", err) })
		} else {
			setISRCCode("please enter a valid ISRC Code")
			setUserUsage(DEFAULT_USER_USAGE)
		}
	}

    
    const submitMockedCheckISRCValidity = () => {
		console.log("ISRCCode : ", ISRCCode)
		console.log("artist : ", artist)
		if(ISRCCode && artist !== "0x0") {
			console.log("ready to submitMockedCheckISRCValidity")
			mockedCheckISRCValidity(ISRCCode, artist as `0x${string}`)
			.then((result => {
				console.log("submitMockedCheckISRCValidity status : ", result)
			}))
			.catch(err => {console.log("submitMockedCheckISRCValidity error : ", err)})
		}
	}

    const submitBuyAllowance = () => {
		console.log("ISRCCode : ", ISRCCode)
		console.log("amount : ", allowanceAmount)
		if(ISRCCode && BigInt(allowanceAmount) > BigInt(0)) {
			console.log("ready to buy allowance")
			buyAllowance(
				ISRCCode,
				address as `0x${string}`,
				BigInt(allowanceAmount),
			)
			.then((result => {
				console.log("buy allowance status : ", result)
			}))
			.catch(err => {console.log("buy allowance error : ", err)})
		}
	}


    return (
        <div className=" m-4 p-4 text-sm font-light">
            <h1 className="font-bold p-2">Alltunes - Helper </h1>

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


            {/* GetAdmin */}
            <div className="my-1 bg-slate-950/50 p-2 rounded-md border border-slate-800 bg-slate-950 text-slate-200">
                <div className="flex gap-2 ">
                    <div>
                        <button onClick={handleGetAdmin} className="text-violet-100 p-2 rounded-lg border border-slate-500 hover:border-indigo-400 hover:text-indigo-200">
                            getAdmin
                        </button>
                    </div>
                    <div className="py-2">
                        <span className="pr-2 ">Admin : </span>
                        <span className="font-thin text-sm text-pink-500">{admin}</span>
                    </div>
                </div>
            </div>

            {/* GetISRCCode */}
            <div className="my-1 bg-slate-950/50 p-2 rounded-md border border-slate-800 bg-slate-950 text-slate-200">
                <div className="flex gap-2 ">
                    <div>
                        <button onClick={handleGetISRCSpec} className="text-violet-100 p-2 rounded-lg border border-slate-500 hover:border-indigo-400 hover:text-indigo-200">
                        getISRCSpec
                        </button>
                    </div>
                    <div>
                        <div>
                        <input className="m-2 p-1 bg-slate-300 text-violet-950 rounded"
                            type="text" onChange={e => setISRCCode(e.target.value)}
                            placeholder="ISRC code" required />
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="pr-2 font-medium text-teal-300">ISRCSpec</div>
                            <div>
                                <span>minPrice : </span>
                                <span className="font-thin text-sm text-pink-500">{ISRCSpec?.minPrice.toString()}</span>
                            </div>
                            <div>
                                <span>artistAddress : </span>
                                <span className="font-thin text-sm text-pink-500">{ISRCSpec?.artistAddress}</span>
                            </div>
                            <div>
                                <span>isBound : </span>
                                <span className="font-thin text-sm text-pink-500">{String(ISRCSpec?.isBound)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="font-extralight italic text-sm">
                    <span>ISRC Code example: </span>
                    <span className="text-cyan-200">ISRC AA-6Q7-20-00047</span>
                </div>
            </div>

            {/* GetUserUsage */}
            <div className="my-1 bg-slate-950/50 p-2 rounded-md border border-slate-800 bg-slate-950 text-slate-200">
                <div className="flex gap-2 ">
                    <div>
                        <button onClick={handleGetUserUsage} className="text-violet-100 p-2 rounded-lg border border-slate-500 hover:border-indigo-400 hover:text-indigo-200">
                        GetUserUsage
                        </button>
                    </div>
                    <div>
                        <input className="m-2 p-1 bg-slate-300 text-violet-950 rounded"
                            type="text" onChange={e => setISRCCode(e.target.value)}
                            placeholder="ISRC code" required />
                    </div>
                    <div>
                        <input className="m-2 p-1 bg-slate-300 text-violet-950 rounded"
                            type="text" onChange={e => setUserAddr(e.target.value as `0x${string}`)}
                            placeholder="User address (0x0)" required />
                    </div>
                    <div>
                        <div>
                            <div className="pr-2 font-medium text-teal-300">User Usage</div>
                            <div>
                                <span>listenDuration : </span>
                                <span className="font-thin text-sm text-pink-500">{userUsage?.listenDuration.toString()}</span>
                            </div>
                            <div>
                                <span>mode : </span>
                                <span className="font-thin text-sm text-pink-500">{userUsage?.mode}</span>
                            </div>
                            <div>
                                <span>allowanceType : </span>
                                <span className="font-thin text-sm text-pink-500">{userUsage?.allowanceType}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* mockedCheckISRCValidity */}
            <div className="my-1 bg-slate-950/50 p-2 rounded-md border border-slate-800 bg-slate-950 text-slate-200">
                <div className="flex gap-2 ">
                    <div>
                        <button onClick={submitMockedCheckISRCValidity} className="text-violet-100 p-2 rounded-lg border border-slate-500 hover:border-indigo-400 hover:text-indigo-200">
                            MockedCheckISRCValidity
                        </button>
                    </div>
                    <div>
                        <input className="m-2 p-1 bg-slate-300 text-violet-950 rounded"
                            type="text" onChange={e => setISRCCode(e.target.value)}
                            placeholder="ISRC code" required />
                    </div>

                    <div>
                        <input className="m-2 p-1 bg-slate-300 text-violet-950 rounded"
                            type="text" onChange={e => setArtist(e.target.value as `0x${string}`)}
                            placeholder="Artist address 0x0" required />
                    </div>
                    
                </div>

                <div className="font-extralight italic text-sm">
                    <span>ISRC Code example: </span>
                    <span className="text-cyan-200">ISRC AA-6Q7-20-00047</span>
                </div>
            </div>


            {/* buyAllowance */}
            <div className="my-1 bg-slate-950/50 p-2 rounded-md border border-slate-800 bg-slate-950 text-slate-200">
                <div className="flex gap-2 ">
                    <div>
                        <button onClick={submitBuyAllowance} className="text-violet-100 p-2 rounded-lg border border-slate-500 hover:border-indigo-400 hover:text-indigo-200">
                            buyAllowance
                        </button>
                    </div>
                    <div>
                        <input className="m-2 p-1 bg-slate-300 text-violet-950 rounded"
                            type="text" onChange={e => setISRCCode(e.target.value)}
                            placeholder="ISRC code" required />
                    </div>

                    <div>
                        <input className="m-2 p-1 bg-slate-300 text-violet-950 rounded"
                            type="text" onChange={e => setAllowanceAmount(Number(e.target.value))}
                            placeholder="Amount" required />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Helper