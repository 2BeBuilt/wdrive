import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Tooltip, Image } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useNetwork, useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import abi from '@/utils/constants/abi.json'
import chains from '@/utils/constants/chains.json'
import FlexCenter from '@/components/Common/FlexCenter'
import PageHead from '@/components/Common/PageHead'

export default function Mint() {
  const [shipLogo, setShipLogo] = useState(null)
  const [contract, setContract] = useState(null)
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const toast = useToast()

  useEffect(() => {
    const chainFound = chains.filter((c) => c.name === chain.network)[0]
    setShipLogo(chainFound.ship)
    setContract(chainFound.address)
  }, [chain])
  console.log(contract)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contract,
    abi: abi,
    functionName: 'safeWarp',
    args: [],
  })
  const { data, write, error } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  if (error) {
    toast({
      title: 'Error',
      description: 'Something went wrong',
      position: 'top',
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }

  if (data) {
    toast({
      title: 'Success',
      description: data?.hash,
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <>
      <PageHead title="Build Ship" />
      <FlexCenter>
        {isConnected && (
          <Tooltip label="Build Ship" placement="bottom">
            <Image
              cursor="pointer"
              onClick={write}
              rounded="lg"
              height={300}
              width={300}
              src={shipLogo}
            />
          </Tooltip>
        )}
      </FlexCenter>
    </>
  )
}
