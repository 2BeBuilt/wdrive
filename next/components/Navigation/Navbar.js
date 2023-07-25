import { HStack, SimpleGrid } from '@chakra-ui/react'
import Logo from './Logo'
import FlexCenter from '../Common/FlexCenter'
import Navitem from './Navitem'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar() {
  return (
    <HStack
      spacing={{ md: '56', base: '4' }}
      px={4}
      pos={'fixed'}
      top={10}
      w={'100%'}
      align={'center'}
      justify={'center'}
    >
      <Logo />
      <Navitem href="/mint">Build Ship</Navitem>
      <Navitem href="/space-port">Space Port</Navitem>
      <FlexCenter>
        <ConnectButton
          chainStatus="icon"
          showBalance={false}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'avatar',
          }}
        />
      </FlexCenter>
    </HStack>
  )
}
