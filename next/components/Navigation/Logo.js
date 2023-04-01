import { Heading, Stack, Image } from '@chakra-ui/react'
import Link from 'next/link'

export default function Logo() {
  return (
    <div>
      <Stack
        boxSize="150px"
        alignItems="center"
        justify="center"
        marginLeft="14"
      >
        <Image src="/logo.png" borderRadius="lg" alt="logo" />
        <Link href="/">
          <Heading
            fontSize="2xl"
            textTransform={'uppercase'}
            _hover={{ color: 'offWhite' }}
          >
            Warp Drive
          </Heading>
        </Link>
      </Stack>
    </div>
  )
}
