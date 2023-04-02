import {
  Spinner,
  Box,
  Center,
  Button,
  Text,
  Stack,
  Image,
  Flex,
  SimpleGrid,
  Tooltip,
  Heading,
} from '@chakra-ui/react'
import { useState } from 'react'
import { switchNetwork } from '@wagmi/core'
import { useNetwork } from 'wagmi'

import chains from '@/utils/constants/chains.json'
import FlexCenter from '../Common/FlexCenter'
import WarpModal from '../Modals/WarpModal'

export default function NftView({ tokenId, chainName, image, name, uri }) {
  const { chain } = useNetwork()
  const [warpModal, setWarpModal] = useState(false)
  const handleWarpModalClose = () => {
    setWarpModal(false)
  }
  const handleWarModalOpen = () => {
    const chainId = Number(chains.filter((c) => c.name === chainName)[0].id)
    chain.id !== chainId && switchNetwork({ chainId: chainId })
    setWarpModal(true)
  }

  const logo = chains.filter((c) => c.name === chainName)[0].logo
  let boxBg = 'black'
  let networkName = 'None'
  if (chainName === 'goerli') {
    boxBg = 'gray.800'
    networkName = 'Goerli'
  } else if (chainName === 'maticmum') {
    boxBg = 'purple.800'
    networkName = 'Polygon Mumbai'
  } else if (chainName === 'bsc-testnet') {
    boxBg = 'yellow.800'
    networkName = 'BSC Testnet'
  } else if (chainName === 'avalanche-fuji') {
    boxBg = 'red.800'
    networkName = 'Avalanche Fuji'
  }

  return (
    <>
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={boxBg}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
        >
          <FlexCenter>
            <Tooltip label={networkName} placement="top">
              <Image height={8} width={8} src={logo} />
            </Tooltip>
          </FlexCenter>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${image})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}
          >
            {image ? (
              <Image
                marginTop={16}
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src={image}
              />
            ) : (
              <Flex direction="column" align="center" justify="center">
                <Spinner size="xl" />
              </Flex>
            )}
          </Box>
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.500'}
              fontSize={'md'}
              textTransform={'uppercase'}
            >
              {`SHIP #${tokenId}`}
            </Text>
            <SimpleGrid columns={1} spacing={2}>
              <Button onClick={handleWarModalOpen}>Warp</Button>
            </SimpleGrid>
            <Heading fontSize="xl">{name}</Heading>
          </Stack>
        </Box>
      </Center>
      <WarpModal
        isOpen={warpModal}
        tokenId={tokenId}
        newURI={uri}
        handleClose={handleWarpModalClose}
      />
    </>
  )
}
