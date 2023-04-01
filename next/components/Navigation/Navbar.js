import { SimpleGrid } from '@chakra-ui/react'
import Logo from './Logo'
import FlexCenter from '../Common/FlexCenter'
import Navitem from './Navitem'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar() {
  return (
    <SimpleGrid
      columns={4}
      spacing={8}
      pos="relative"
      height="250px"
      alignItems="center"
      justifyContent="center"
    >
      <Logo />
      <Navitem href="/warp">Use Warp</Navitem>
      <Navitem href="/space-port">Space Port</Navitem>
      <FlexCenter>
        <ConnectButton
          chainStatus="icon"
          showBalance={true}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'avatar',
          }}
        />
      </FlexCenter>
    </SimpleGrid>
  )
}
