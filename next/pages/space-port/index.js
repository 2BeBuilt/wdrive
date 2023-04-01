import NftView from '@/components/NFT/nftView'

import { SimpleGrid } from '@chakra-ui/react'

export default function SpacePort({ address }) {
  const nfts = []
  for (let i = 0; i < 10; i++) {
    nfts.push({ key: i })
  }

  return (
    <SimpleGrid columns={5} spacing={6} marginLeft={4} marginRight={4}>
      {nfts.map((nft) => (
        <NftView key={nft.key} tokenId={nft.key} image={'/logo.png'} />
      ))}
    </SimpleGrid>
  )
}
