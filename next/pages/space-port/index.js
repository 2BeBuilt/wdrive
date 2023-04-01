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
              tokens.push({ ...res, chain: chain.network })
            })
            setTokens((prev) => prev.concat(tokens))
          })
      })
    }

    isConnected && fetchData()
  }, [isConnected])

  console.log(tokens)
  return (
    <SimpleGrid columns={4} spacing={6} marginLeft={20} marginRight={20}>
      {tokens.map((token) => (
        <NftView
          key={token.token_id}
          chain={token.chain}
          tokenId={token.token_id}
          image={'/logo.png'}
        />
      ))}
    </SimpleGrid>
  )
}
