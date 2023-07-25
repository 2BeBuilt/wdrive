import NftView from '@/components/NFT/nftView'
import PageHead from '@/components/Common/PageHead'
import DefaultAlert from '@/components/Alert/DefaultAlert'
import FlexCenter from '@/components/Common/FlexCenter'
import axios from 'axios'

import { Center, Flex, SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import { useToast } from '@chakra-ui/react'

export default function SpacePort() {
  const toast = useToast()
  const [tokens, setTokens] = useState([])
  const { address, isConnected, isDisconnected } = useAccount()
  const { chains } = useNetwork()

  useEffect(() => {
    toast({
      title: 'Warning',
      description: 'Avalanche Fuji network was deprecated by Moralis!',
      position: 'top',
      status: 'warning',
      duration: 3000,
      isClosable: true,
    })
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      clearData()
      chains.forEach((chain) => {
        axios
          .get(`/api/moralis/getNfts?chain=${chain.network}&address=${address}`)
          .then((response) => {
            response.data.result.forEach((res) => {
              if (res.token_uri) {
                let tokens = []
                const uri =
                  res.token_uri &&
                  res.token_uri.replace('ipfs.moralis.io:2053', 'ipfs.io')
                axios.get(uri).then((response) => {
                  tokens.push({
                    ...res,
                    chain: chain.network,
                    name: response.data.name,
                    image: response.data.image.replace(
                      'ipfs://',
                      'https://ipfs.io/ipfs/'
                    ),
                  })
                  setTokens((prev) => prev.concat(tokens))
                })
              }
            })
          })
          .catch((error) => {
            console.log(error)
          })
          .then(() => new Promise((resolve) => setTimeout(resolve, 100)))
      })
    }

    const clearData = () => {
      setTokens([])
    }

    isDisconnected &&
      toast({
        title: 'Error',
        description: 'Wallet is disconnected!',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })

    isConnected && fetchData()
    isDisconnected && clearData()
  }, [isConnected, isDisconnected, address])

  return (
    <>
      <PageHead title="Space Port" />
      <Flex
        py={{ md: '72', base: '52' }}
        px={'4'}
        align={'center'}
        justify={'center'}
        w={'100%'}
      >
        <SimpleGrid
          columns={{ md: 4, base: 1 }}
          spacingX={6}
          spacingY={0}
          display={tokens.length > 0 ? 'grid' : 'none'}
        >
          {tokens.map((token) => {
            return (
              <NftView
                key={token.token_id}
                chainName={token.chain}
                tokenId={token.token_id}
                image={token.image}
                name={token.name}
              />
            )
          })}
        </SimpleGrid>
        <Flex>
          <DefaultAlert
            isOpen={tokens.length === 0}
            status="warning"
            title="Space Port is empty"
            description="Build a ship first"
          />
        </Flex>
      </Flex>
    </>
  )
}
