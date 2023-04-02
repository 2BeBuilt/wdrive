import { Heading, Container, Stack, Text } from '@chakra-ui/react'

import PageHead from '@/components/Common/PageHead'

export default function Home() {
  return (
    <>
      <PageHead title="Warp Drive" />
      <main>
        <Stack
          spacing={4}
          as={Container}
          maxW="4xl"
          textAlign="center"
          marginTop="10vh"
        >
          <Heading>Warp Drive</Heading>
          <Text>
            In the 41st millennium, the once-unified XII Warp Fleet clashes in
            an epic, cross-chain war spanning four blockchains. Unleash your
            strategic prowess and lead your faction to victory in the relentless
            struggle for blockchain supremacy. Experience the thrill of warfare
            and the ingenuity of cutting-edge technology as you join the
            greatest multi-chain battle of all time, inspired by Warhammer 40k
            and empowered by the Axelar Network.
          </Text>
        </Stack>
      </main>
    </>
  )
}
