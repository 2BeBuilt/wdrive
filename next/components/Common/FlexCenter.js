import { Flex } from '@chakra-ui/react'

export default function FlexCenter({ direction, children, ...props }) {
  return (
    <div>
      <Flex
        direction={direction}
        alignItems="center"
        justify="center"
        {...props}
      >
        {children}
      </Flex>
    </div>
  )
}
