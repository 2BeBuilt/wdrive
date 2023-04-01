import NftView from '@/components/NFT/nftView'
import axios from 'axios'

import { SimpleGrid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork } from 'wagmi'

export default function SpacePort() {
  const [tokens, setTokens] = useState([])
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`/api/moralis/getNfts?chain=${chain.network}&address=${address}`)
        .then((response) => {
          setTokens(response.data.result)
        })
    }
    isConnected && fetchData()
  }, [chain])

  return (
    <SimpleGrid columns={4} spacing={6} marginLeft={20} marginRight={20}>
      {tokens.map((token) => (
        <NftView
          key={token.token_id}
          tokenId={token.token_id}
          image={'/logo.png'}
        />
      ))}
    </SimpleGrid>
  )
}
