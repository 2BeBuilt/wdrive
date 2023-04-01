import { useToast, Button } from '@chakra-ui/react'
import {
  AxelarAssetTransfer,
  AxelarQueryAPI,
  CHAINS,
  Environment,
} from '@axelar-network/axelarjs-sdk'
import { BigNumber, utils } from 'ethers'
import { useState } from 'react'
import abi from '@/utils/constants/abi.json'
import { useContract, useContractWrite } from '@thirdweb-dev/react-core'

import { Web3Button } from '@thirdweb-dev/react'

import chains from '@/utils/constants/testnet.json'

function calculateBridgeFee(source, destination, options = {}) {
  const api = new AxelarQueryAPI({ environment: Environment.TESTNET })
  const { gasLimit, gasMultiplier, symbol } = options

  return api.estimateGasFee(
    CHAINS.TESTNET[source.name.toUpperCase()],
    CHAINS.TESTNET[destination.name.toUpperCase()],
    symbol || source.tokenSymbol,
    gasLimit,
    gasMultiplier
  )
}

const source = chains[0]
const destination = chains[1]
const contractAddress = source.contract.address
const message = `Received message that written at ${new Date().toLocaleTimeString()}.`

export default function Warp() {
  const [fee, setFee] = useState(null)
  const [remote, setRemote] = useState(null)

  const { contract } = useContract(contractAddress, abi)
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    'sendContractCall'
  )

  const handleClick = async () => {
    const feeRemote = await calculateBridgeFee(source, destination)
    setRemote(feeRemote)
    const feeSource = await calculateBridgeFee(source, source)
    const total = BigNumber.from(feeRemote).add(feeSource)
    setFee(total)
  }

  return (
    <div>
      <Button onClick={handleClick}>Calculate fee</Button>
      <h1>Warp</h1>
      {fee && remote && (
        <Web3Button
          contractAddress={contractAddress}
          action={() =>
            mutateAsync({
              args: [
                destination.name,
                destination.receiver.address,
                utils.defaultAbiCoder.encode(['string'], [message]),
                remote,
              ],
              overrides: {
                gasLimit: BigNumber.from(
                  Math.ceil(utils.formatUnits(fee, 'gwei'))
                ), // override default gas limit
                value: BigNumber.from(
                  Math.ceil(utils.formatUnits(fee, 'gwei'))
                ), // send 0.1 ether with the contract call
              },
            })
          }
        >
          Send Transaction
        </Web3Button>
      )}
    </div>
  )
}
