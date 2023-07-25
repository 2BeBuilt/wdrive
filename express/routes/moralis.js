const Moralis = require('moralis').default
const chains = require('../utils/constants/chains.json')
const addresses = require('../utils/constants/addresses.json')

const startMoralis = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  })
}

var express = require('express')
var router = express.Router()
startMoralis()

router.get('/getNfts', async (req, res, next) => {
  const chain = req.query.chain

  const chainId = chains.filter((c) => c.name === chain)[0].id
  const address = req.query.address

  const tokenAddresses = [
    addresses.filter((c) => c.chainId === chainId)[0].address,
  ]

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: chainId,
    format: 'decimal',
    tokenAddresses: tokenAddresses[0] === '' ? [] : tokenAddresses,
    mediaItems: false,
    address: address,
  })

  res.send(response.raw)
})

module.exports = router
