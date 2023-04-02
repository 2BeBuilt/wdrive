import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Tooltip, Image, Flex } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useNetwork, useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import abi from '@/utils/constants/abi.json'
import chains from '@/utils/constants/chains.json'
import FlexCenter from '@/components/Common/FlexCenter'
import PageHead from '@/components/Common/PageHead'
import DefaultAlert from '@/components/Alert/DefaultAlert'
import LinkAlert from '@/components/Alert/LinkAlert'

export default function Mint() {
  const [shipLogo, setShipLogo] = useState(null)
  const [contract, setContract] = useState(null)
  const { address, isConnected, isDisconnected } = useAccount()
  const { chain } = useNetwork()
  const toast = useToast()

  useEffect(() => {
    const readChain = () => {
      const chainFound = chains.filter((c) => c.name === chain.network)[0]
      setShipLogo(chainFound.ship)
      setContract(chainFound.address)
    }

    isConnected && readChain()
  }, [chain, isConnected])

  useEffect(() => {
    isDisconnected &&
      toast({
        title: 'Error',
        description: 'Wallet is disconnected!',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
  }, [isDisconnected])

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: contract,
    abi: abi,
    functionName: 'safeWarp',
    args: [],
    overrides: {
      gasLimit: 200000,
    },
  })
  const { data, write, error } = useContractWrite(config)
  const { isLoading, isSuccess, isError } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
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
  }, [data, error])

  return (
    <>
      <PageHead title="Build Ship" />
      <FlexCenter direction="column" paddingBottom={20}>
        {isConnected && (
          <>
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
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              marginTop={4}
            >
              <DefaultAlert
                isOpen={true}
                title="Warning"
                status="warning"
                description="To mint, manually increase the gas limit to 200 000 gwei, even though it will use much less gas."
              />
              <LinkAlert
                isOpen={true}
                title="Warning"
                status="warning"
                marginTop={4}
              />
            </Flex>
          </>
        )}
      </FlexCenter>
    </>
  )
}
