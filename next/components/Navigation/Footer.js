import FlexCenter from '../Common/FlexCenter'
import { Button, Container, Text, Stack, Image, Flex } from '@chakra-ui/react'
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
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
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
        <Stack direction={'row'} spacing={6}>
          <Button
            onClick={() => {
              window.open('https://github.com/Canvinus/warp-drive', '_blank')
            }}
          >
            Github
          </Button>
        </Stack>
      </Container>
    </Flex>
  )
}
