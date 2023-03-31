import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Goerli, Mumbai } from '@thirdweb-dev/chains'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/utils/theme'

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      dAppMeta={{
        name: 'Warp Drive',
        description: 'My app description',
        logoUrl: 'https://example.com/logo.png',
        url: 'https://example.com',
        isDarkMode: true,
      }}
      supportedChains={[Goerli, Mumbai]}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  )
}
