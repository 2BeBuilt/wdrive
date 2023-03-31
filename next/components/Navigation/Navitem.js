import FlexCenter from '../Common/FlexCenter'
import { Heading } from '@chakra-ui/react'
import Link from 'next/link'

export default function Navitem({ children, href, ...props }) {
  return (
    <FlexCenter>
      <Link href={href}>
        <Heading
          cursor="pointer"
          fontSize="2xl"
          textTransform={'uppercase'}
          _hover={{ color: 'offWhite' }}
          _focus={{ color: 'offWhite' }}
        >
          {children}
        </Heading>
      </Link>
    </FlexCenter>
  )
}
