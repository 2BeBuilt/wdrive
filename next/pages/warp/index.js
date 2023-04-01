import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { ethers } from 'ethers'
import { useState } from 'react'
import { calculateBridgeFee } from '@/utils/bridgeFee'
import { Button } from '@chakra-ui/react'

import abi from '@/utils/constants/abi.json'
import chains from '@/utils/constants/testnet.json'

const source = chains[1]
const destination = chains[0]
const contractAddress = source.contract.address
const message = 'test123'

export default function Warp() {
  const [totalFee, setTotal] = useState(0)
  const [remoteFee, setRemote] = useState(0)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'sendContractCall',
    args: [
      destination.name,
      destination.receiver.address,
      ethers.utils.defaultAbiCoder.encode(['string'], [message]),
      remoteFee,
    ],
    overrides: {
      gasLimit: 1000000,
      value: 1000000,
    },
  })
  const { data, write, error } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  {
    error && console.log(error)
  }
  {
    data && console.log(data)
  }

  const handleClick = async () => {
    const feeRemote = await calculateBridgeFee(source, destination)
    setRemote(feeRemote)
    const feeSource = await calculateBridgeFee(source, source)
    const total = ethers.BigNumber.from(feeRemote).add(feeSource)
    setTotal(total)
  }

  return (
    <div>
      <Button onClick={handleClick}>Calculate Fee</Button>
      {totalFee && remoteFee && <Button onClick={write}>Send Tx</Button>}
    </div>
  )
}
