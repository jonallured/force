import { Box, type BoxProps } from "@artsy/palette"
import type { FC } from "react"

interface LayoutMainProps extends BoxProps {}

export const LayoutMain: FC<React.PropsWithChildren<LayoutMainProps>> = ({
  children,
  ...rest
}) => {
  return (
    <Box as="main" id="main" overflowX="hidden" {...rest}>
      {children}
    </Box>
  )
}
