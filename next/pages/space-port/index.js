import NftView from '@/components/NFT/nftView'
import axios from 'axios'

import { SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'
import PageHead from '@/components/Common/PageHead'

export default function SpacePort() {
  const [tokens, setTokens] = useState([])
  const { address, isConnected, isDisconnected } = useAccount()
  const { chains } = useNetwork()

  useEffect(() => {
    const fetchData = async () => {
      chains.forEach((chain) => {
        axios
          .get(`/api/moralis/getNfts?chain=${chain.network}&address=${address}`)
          .then((response) => {
            let tokens = []
            response.data.result.forEach((res) => {
              if (res.token_uri) {
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
                })
              } else {
                tokens.push({
                  ...res,
                  chain: chain.network,
                  image: null,
                })
              }
              setTokens((prev) => prev.concat(tokens))
            })
          })
      })
    }

    const clearData = () => {
      setTokens([])
    }

    isConnected && fetchData()
    isDisconnected && clearData()
  }, [isConnected, isDisconnected])

  return (
    <>
      <PageHead title="Space Port" />
      <SimpleGrid columns={4} spacing={6} marginLeft={20} marginRight={20}>
        {tokens.map((token) => {
          return (
            <NftView
              key={token.token_id}
              chain={token.chain}
              tokenId={token.token_id}
              image={token.image}
              name={token.name}
            />
          )
        })}
      </SimpleGrid>
    </>
  )
}
