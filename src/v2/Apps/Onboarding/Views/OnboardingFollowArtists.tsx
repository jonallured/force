import {
  Box,
  Text,
  LabeledInput,
  MagnifyingGlassIcon,
  Button,
  Flex,
} from "@artsy/palette"
import { FC, useState } from "react"
import { OnboardingOrderedSetQueryRenderer } from "../Components/OnboardingOrderedSet"
import { OnboardingSplitLayout } from "../Components/OnboardingSplitLayout"
import { useOnboardingContext } from "../useOnboardingContext"
import { OnboardingSearchResultsQueryRenderer } from "../Components/OnboardingSearchResults"

export const OnboardingFollowArtists: FC = () => {
  const { next, state } = useOnboardingContext()
  const [query, setQuery] = useState("")

  return (
    <OnboardingSplitLayout
      left={<Box width="100%" height="100%" bg="black10" />}
      right={
        <Flex flexDirection="column">
          <Box pt={4} px={4}>
            <Text variant="lg-display" mb={2}>
              Follow artists to see more of their work
            </Text>

            <LabeledInput
              label={<MagnifyingGlassIcon />}
              placeholder="Search Artists"
              mb={4}
              onChange={event => setQuery(event.currentTarget.value)}
            />
          </Box>

          <Box
            px={4}
            flex={1}
            overflowY="auto"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {query ? (
              <OnboardingSearchResultsQueryRenderer term={query} />
            ) : (
              <OnboardingOrderedSetQueryRenderer id="onboarding:suggested-artists" />
            )}
          </Box>

          <Box p={2}>
            <Button
              width="100%"
              onClick={next}
              disabled={state.followedIds.length === 0}
            >
              Done
            </Button>
          </Box>
        </Flex>
      }
    />
  )
}