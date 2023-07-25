import FlexCenter from '../Common/FlexCenter'
import {
  Button,
  Container,
  Text,
  Stack,
  Image,
  Flex,
  HStack,
} from '@chakra-ui/react'
import Link from 'next/link'

export default function Footer() {
  return (
    <Flex
      bg="gray.900"
      color="gray.200"
      as="footer"
      position="fixed"
      bottom="0"
      width="100%"
      zIndex={10}
      align={'center'}
      justify={'center'}
      py={3}
    >
      <HStack spacing={6}>
        <Link href={'https://axelar.network/'} target="_blank">
          <FlexCenter>
            <Text>Powered by Axelar</Text>
            <Image
              ml={2}
              rounded="full"
              width={8}
              height={8}
              src={'/axelar.png'}
            />
          </FlexCenter>
        </Link>
        <Button
          onClick={() => {
            window.open('https://github.com/Canvinus/warp-drive', '_blank')
          }}
        >
          Github
        </Button>
      </HStack>
    </Flex>
  )
}
