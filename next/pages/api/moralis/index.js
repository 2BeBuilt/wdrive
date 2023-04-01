import Moralis from 'moralis'

try {
  await Moralis.start({
    apiKey: 'YOUR_API_KEY',
  })

  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: '0x1',
    format: 'decimal',
    tokenAddresses: [],
    mediaItems: false,
    address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  })

  console.log(response.raw)
} catch (e) {
  console.error(e)
}
