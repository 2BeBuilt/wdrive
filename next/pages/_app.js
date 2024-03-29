import '@rainbow-me/rainbowkit/styles.css'

import Navbar from '@/components/Navigation/Navbar'
import Footer from '@/components/Navigation/Footer'

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { goerli, polygonMumbai, avalancheFuji, bscTestnet } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/utils/theme'
import { Container } from '@chakra-ui/react'

const { chains, provider } = configureChains(
  [goerli, polygonMumbai, avalancheFuji, bscTestnet],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Warp Drive',
  projectId: '6870c5ef8bc2e81efcd0f04c4b6dd332',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
