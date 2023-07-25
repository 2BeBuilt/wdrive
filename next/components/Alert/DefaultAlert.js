import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

export default function DefaultAlert({ isOpen, status, title, description }) {
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
      minW={'200'}
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
        <Box>
          <AlertTitle fontSize="lg">{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Box>
        <CloseButton onClick={() => setOpen((prev) => !prev)} />
      </Stack>
    </Alert>
  ) : (
    <></>
  )
}
