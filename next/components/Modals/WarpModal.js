import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
} from '@chakra-ui/react'
import { useSigner, useNetwork } from 'wagmi'
import { ethers } from 'ethers'
import { calculateBridgeFee } from '@/utils/bridgeFee'
import { useToast } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

import abi from '@/utils/constants/abi.json'
import chains from '@/utils/constants/testnet.json'
import FlexCenter from '@/components/Common/FlexCenter'

export default function WarpModal({ tokenId, isOpen, handleClose }) {
  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px) " />
  const [overlay, setOverlay] = useState(<OverlayOne />)

  const [source, setSource] = useState(null)
  const [destination, setDestination] = useState(null)
  const { chain } = useNetwork()

  useEffect(() => {
    setSource(chains.filter((c) => c.chainId === chain.id)[0])
  }, [chain])

  const toast = useToast()
  const { data: signer } = useSigner()

  const call = async () => {
    try {
      const contract = new ethers.Contract(source.contract.address, abi, signer)

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

      const txTwo = await contract.update(tokenId, {
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

  const handleSelection = (e) => {
    setDestination(
      chains.filter((c) => c.chainId.toString() === e.target.value)[0]
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {overlay}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Warping Ship #{tokenId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FlexCenter>
            <Select
              placeholder="Select destination chain"
              width="150"
              onChange={handleSelection}
            >
              {source?.chainId !== 5 && <option value="5">Goerli</option>}
              {source?.chainId !== 80001 && (
                <option value="80001">Mumbai</option>
              )}
              {source?.chainId !== 97 && (
                <option value="97">BSC Testnet</option>
              )}
              {source?.chainId !== 43113 && (
                <option value="43113">Avax Fuji</option>
              )}
            </Select>
            {source && destination && (
              <Button onClick={call} ml={12}>
                Use Warp
              </Button>
            )}
          </FlexCenter>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}
