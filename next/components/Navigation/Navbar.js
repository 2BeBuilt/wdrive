import { SimpleGrid } from '@chakra-ui/react'
import { ConnectWallet } from '@thirdweb-dev/react'
import Logo from './Logo'
import FlexCenter from '../Common/FlexCenter'
import Navitem from './Navitem'

export default function Navbar() {
  return (
    <SimpleGrid
      columns={4}
      spacing={8}
      align="center"
      pos="relative"
      justify="center"
      height="250px"
      alignItems="center"
      justifyContent="center"
    >
      <Logo />
      <Navitem href="/warp">Use Warp</Navitem>
      <Navitem href="/space-port">Space Port</Navitem>
      <FlexCenter>
        <ConnectWallet theme="dark" />
      </FlexCenter>
    </SimpleGrid>
  )
}
