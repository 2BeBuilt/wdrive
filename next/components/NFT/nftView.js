import {
  Spinner,
  Box,
  Center,
  useColorModeValue,
  Text,
  Stack,
  Image,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react'

export default function NftView({ tokenId, chain, image }) {
  let boxBg = 'black'
  if (chain === 'goerli') {
    boxBg = 'gray.800'
  } else if (chain === 'maticmum') {
    boxBg = 'purple.800'
  } else if (chain === 'bsc-testnet') {
    boxBg = 'yellow.800'
  } else if (chain === 'avalanche-fuji') {
    boxBg = 'red.800'
  }

  return (
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
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {`NFT #${tokenId}`}
          </Text>
          <SimpleGrid columns={3} spacing={2}>
            {/* functions */}
          </SimpleGrid>
          <Text>Nft name</Text>
        </Stack>
      </Box>
    </Center>
  )
}
