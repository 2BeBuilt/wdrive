import { Heading, Stack, Image, Box } from '@chakra-ui/react'
import Link from 'next/link'

export default function Logo() {
  return (
    <Box boxSize={{ md: '150px', base: '10' }}>
      <Link href="/">
        <Image src="/logo.png" borderRadius="lg" alt="logo" />
        <Heading
          display={{ md: 'flex', base: 'none' }}
          fontSize={'2xl'}
          textTransform={'uppercase'}
          _hover={{ color: 'offWhite' }}
        >
          Warp Drive
        </Heading>
      </Link>
    </Box>
  )
}
