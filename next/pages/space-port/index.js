import NftView from '@/components/NFT/nftView'
import axios from 'axios'

import { SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'

export default function SpacePort() {
  const [tokens, setTokens] = useState([])
  const { address, isConnected } = useAccount()
  const { chains } = useNetwork()

  useEffect(() => {
    const fetchData = async () => {
      chains.forEach((chain) => {
        axios
          .get(`/api/moralis/getNfts?chain=${chain.network}&address=${address}`)
          .then((response) => {
            let tokens = []
            response.data.result.forEach((res) => {
              const uri =
                res.token_uri &&
                res.token_uri.replace('ipfs.moralis.io:2053', 'ipfs.io')

              tokens.push({ ...res, chain: chain.network, image: uri })
            })
            setTokens((prev) => prev.concat(tokens))
          })
      })
    }

    isConnected && fetchData()
  }, [isConnected])

  return (
    <SimpleGrid columns={4} spacing={6} marginLeft={20} marginRight={20}>
      {tokens.map((token) => {
        return (
          <NftView
            key={token.token_id}
            chain={token.chain}
            tokenId={token.token_id}
            image={token.image}
          />
        )
      })}
    </SimpleGrid>
  )
}
