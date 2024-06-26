import { Box, Column, Flex, GridColumns } from "@artsy/palette"
import { BottomFormNavigation } from "Apps/Sell/Components/BottomFormNavigation"
import { StepsNavigation } from "Apps/Sell/Components/StepsNavigation"
import { SubmissionHeader } from "Apps/Sell/Components/SubmissionHeader"
import { useSellFlowContext } from "Apps/Sell/SellFlowContext"

const CONTENT_WIDTH = 640

interface SubmissionLayoutProps {
  hideNavigation?: boolean
}

export const SubmissionLayout: React.FC<SubmissionLayoutProps> = ({
  children,
  hideNavigation = false,
}) => {
  const context = useSellFlowContext()

  return (
    <Flex height="100vh" flexDirection="column">
      <SubmissionHeader />

      <Flex flex={1} overflowY="auto" mx="auto">
        {!!context?.state?.devMode && !hideNavigation ? (
          <GridColumns>
            <Column span={[4]}>
              <StepsNavigation />
            </Column>

            <Column span={[8]}>
              <Box maxWidth="100vw" width={CONTENT_WIDTH} p={2} pt={4}>
                {children}
              </Box>
            </Column>
          </GridColumns>
        ) : (
          <Box maxWidth="100vw" width={CONTENT_WIDTH} p={2} pt={4}>
            {children}
          </Box>
        )}
      </Flex>

      {!hideNavigation && <BottomFormNavigation />}
    </Flex>
  )
}
