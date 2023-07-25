import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  Link,
  Stack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export default function LinkAlert({ isOpen, status, title, marginTop }) {
  const [open, setOpen] = useState(isOpen)
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return open ? (
    <Alert
      status={status}
      height="20%"
      width="80%"
      rounded="lg"
      maxW={'400'}
      alignItems={'center'}
      justifyContent={'center'}
      textAlign={'center'}
    >
      <Stack
        alignItems={'center'}
        justifyContent={'center'}
        textAlign={'center'}
      >
        <AlertIcon boxSize="40px" />

        <AlertTitle fontSize="lg">{title}</AlertTitle>
        <AlertDescription maxWidth="sm">
          Our collection addresses are:
          <Link
            href={'https://testnets.opensea.io/collection/warpdrive-polygon'}
            target="_blank"
          >
            {` (`}Mumbai{`, `}
          </Link>
          <Link
            href={'https://testnets.opensea.io/collection/warpdrive-ethereum'}
            target="_blank"
          >
            Goerli{`, `}
          </Link>
          <Link
            href={'https://testnets.opensea.io/collection/warpdrive-avalanche'}
            target="_blank"
          >
            Fuji{`, `}
          </Link>
          <Link
            href={'https://testnets.opensea.io/collection/warpdrive-bnb'}
            target="_blank"
          >
            BNB Testnet{`)`}
          </Link>
        </AlertDescription>
        <CloseButton onClick={() => setOpen((prev) => !prev)} />
      </Stack>
    </Alert>
  ) : (
    <></>
  )
}
