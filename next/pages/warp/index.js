import { useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { calculateBridgeFee } from '@/utils/bridgeFee'
import { Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import abi from '@/utils/constants/abi.json'
import chains from '@/utils/constants/testnet.json'

// check if source chain
const source = chains[1]
const destination = chains[2]
const contractAddress = source.contract.address

export default function Warp() {
  const toast = useToast()
  const { data: signer } = useSigner()

  const call = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer)

      const fee = await calculateBridgeFee(source, destination)
      console.log(fee)
      const txOne = await contract.connectNFTs(
        destination.name,
        destination.contract.address,
        { value: fee }
      )
      toast({
        title: 'ConnectNfts signed',
        description: `https://testnet.axelarscan.io/tx/${txOne.hash}`,
        position: 'top',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      await txOne.wait()

      const newURI =
        'https://ipfs.io/ipfs/bafybeihfxbv6rwil5nlbdqvrho2uyrm5iibpg6qghjute444dvgahv3baa/7.png'

      const txTwo = await contract.update(newURI, 0, {
        value: fee,
      })
      toast({
        title: 'Update signed',
        description: `https://testnet.axelarscan.io/tx/${txTwo.hash}`,
        position: 'top',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      console.log(txTwo)
      await txTwo.wait()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        position: 'top',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Button onClick={call}>Send NFT</Button>
    </>
  )
}
