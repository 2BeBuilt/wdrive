import Moralis from 'moralis'
import chains from '../../utils/constants/api/chains.json'
import addresses from '../../utils/constants/api/addresses.json'

// Initialize Moralis
Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
})

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const chain = req.query.chain

  const chainId = chains.filter((c) => c.name === chain)[0]?.id
  if (!chainId) {
    return res.status(400).send('Invalid chain')
  }

  const address = req.query.address

  const tokenAddresses = [
    addresses.filter((c) => c.chainId === chainId)[0]?.address,
  ]

  try {
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
      chain: chainId,
      format: 'decimal',
      tokenAddresses: tokenAddresses[0] === '' ? [] : tokenAddresses,
      mediaItems: false,
      address: address,
    })

    res.send(response.raw)
  } catch (error) {
    res.status(500).send('Error fetching NFTs')
  }
}
