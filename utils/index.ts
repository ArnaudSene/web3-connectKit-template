import { simulateContract, writeContract,GetBlockNumberErrorType, readContract } from 'wagmi/actions'
import { config } from '../config';
import { allfeat } from '../config/network';
import { sepolia } from 'viem/chains';
import { BaseError, ContractFunctionRevertedError } from 'viem';


export const writeContractByFunctionName = async (
    functionName: string,
    abi: any[],
    contractAddress: `0x${string}`,
    network: string,
    ...args: `0x${string}`[] | any[]
  ): Promise<`0x${string}`> => {
  
    let _chainId = allfeat.id
      
    if (network === "sepolia") {
        _chainId = sepolia.id
    }

    try {
        const result_simu = await simulateContract(config, {
            abi: abi,
            address: contractAddress,
            functionName: functionName,
            // chainId: _chainId, 
            args: args,
        })

        const result = await writeContract(config, {
            abi: abi,
            address: contractAddress,
            functionName: functionName,
            // chainId: _chainId,
            args: args,
        })
          
      return result;
    } catch (e) {
		const error = e as GetBlockNumberErrorType
      console.log("utils.index.writeContractByFunctionName error :", error)
      // throw formattedError(err);
      return "0x0"
    }
  }


export const readContractByFunctionName = async <T>(
    functionName: string,
    abi: any,
    contractAddress: `0x${string}`,
    address: `0x${string}`,
    network: string,
    ...args: `0x${string}`[] | any[]
  ): Promise<T> => {
  
      let _chainId = allfeat.id
      
      if (network === "sepolia") {
		_chainId = sepolia.id
      }

  
    try {
      const data: Promise<T> | unknown = await readContract(config, {
        address: contractAddress,
        abi: abi,
        functionName: functionName,
        // chainId: _chainId,
        account: address,
        args: args,
      });
  
      return data as T;
    } catch (err) {
      throw formattedError(err);
    }
  }



const formattedError = (err: any): Error => {
    if (err instanceof BaseError) {
      // Option 1: checking the instance of the error
      if (err.cause instanceof ContractFunctionRevertedError) {
        const cause: ContractFunctionRevertedError = err.cause;
        const error = cause.reason ?? "Unknown error";
  
        throw new Error(error);
      }
  
      // Option 2: using `walk` method from `BaseError`
      const revertError: any = err.walk(
        (err) => err instanceof ContractFunctionRevertedError
      );
      if (revertError) {
        const error = revertError.data?.message ?? "Unknown error";
  
        throw new Error(error);
      }
    }
  
    throw new Error(err.message);
}