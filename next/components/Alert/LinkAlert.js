import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  Flex,
  Link,
  Container,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export default function LinkAlert({ isOpen, status, title, marginTop }) {
  const [open, setOpen] = useState(isOpen)
  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  return open ? (
    <Container marginTop={marginTop}>
      <Alert
        status={status}
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
        width="500px"
        rounded="lg"
      >
        <Flex direction="column" alignItems="center" justifyContent="center">
          <AlertIcon boxSize="40px" mr={0} />
          <Box>
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {title}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Our collection addresses are:
              <Link
                href={
                  'https://testnets.opensea.io/collection/warpdrive-polygon'
                }
                target="_blank"
              >
                {` (`}Mumbai{`, `}
              </Link>
              <Link
                href={
                  'https://testnets.opensea.io/collection/warpdrive-ethereum'
                }
                target="_blank"
              >
                Goerli{`, `}
              </Link>
              <Link
                href={
                  'https://testnets.opensea.io/collection/warpdrive-avalanche'
                }
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
          </Box>
          <CloseButton mt={4} onClick={() => setOpen((prev) => !prev)} />
        </Flex>
      </Alert>
    </Container>
  ) : (
    <></>
  )
}
