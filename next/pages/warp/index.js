import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useSigner } from 'wagmi'
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
  const { data: signer } = useSigner()

  const call = async () => {
    const contract = new ethers.Contract(contractAddress, abi, signer)

    const feeRemote = await calculateBridgeFee(source, destination)
    const feeSource = await calculateBridgeFee(source, source)
    const payload = ethers.utils.defaultAbiCoder.encode(['string'], [message])

    const tx = await contract
      .sendContractCall(
        destination.name,
        destination.receiver.address,
        payload,
        feeRemote,
        {
          value: ethers.BigNumber.from(feeRemote).add(feeSource),
        }
      )
      .then(async (tx) => {
        console.log(tx)
        tx.wait()
      })
  }

  return (
    <div>
      <Button onClick={call}>Send NFT</Button>
    </div>
  )
}
