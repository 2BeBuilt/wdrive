import Navbar from '@/components/Navigation/Navbar'

import { ThirdwebProvider } from '@thirdweb-dev/react'
import {
  Goerli,
  Mumbai,
  FantomTestnet,
  AvalancheFuji,
} from '@thirdweb-dev/chains'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/utils/theme'

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      dAppMeta={{
        name: 'Warp Drive',
        description: 'Your journey to the outer space of Web3!',
        logoUrl: 'https://wdrive.io/logo.png',
        url: 'https://wdrive.io',
        isDarkMode: true,
      }}
      supportedChains={[FantomTestnet, AvalancheFuji]}
    >
      <ChakraProvider theme={theme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  )
}
