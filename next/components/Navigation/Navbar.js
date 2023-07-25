import { Flex, HStack, SimpleGrid } from '@chakra-ui/react'
import Logo from './Logo'
import FlexCenter from '../Common/FlexCenter'
import Navitem from './Navitem'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar() {
  return (
    <>
      <Flex
        p={4}
        pos={'fixed'}
        top={0}
        w={'100%'}
        pt={'15%'}
        zIndex={10}
        opacity={0.8}
        bgColor={'black'}
        style={{
          backdropFilter: 'blur(10px) contrast(200%)',
        }}
      />
      <HStack
        pos={'fixed'}
        py={{ md: '8', base: '4' }}
        px={'8'}
        spacing={{ md: '56', base: '4' }}
        align={'center'}
        justify={'center'}
        zIndex={20}
        opacity={1}
        w={'100%'}
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
    </>
  )
}
