import { FC, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/SystemContext"
import { ProgressiveOnboardingCountsQuery } from "__generated__/ProgressiveOnboardingCountsQuery.graphql"
import { ProgressiveOnboardingCounts_me$data } from "__generated__/ProgressiveOnboardingCounts_me.graphql"

export interface WithProgressiveOnboardingCountsProps {
  counts: {
    followedArtists: number
    initialFollowedArtists: number
    initialSavedArtworks: number
    savedArtworks: number
  }
}

type Component = FC<WithProgressiveOnboardingCountsProps>

interface ProgressiveOnboardingCountsProps {
  Component: Component
  me: ProgressiveOnboardingCounts_me$data
}

const ProgressiveOnboardingCounts: FC<ProgressiveOnboardingCountsProps> = ({
  Component,
  children,
  me,
}) => {
  const counts = me.counts || { savedArtworks: 0, followedArtists: 0 }
  const savedArtworksCount = counts.savedArtworks
  const followedArtistsCount = counts.followedArtists

  const initialSavedArtworksCount = useRef(savedArtworksCount)
  const initialFollowedArtistsCount = useRef(followedArtistsCount)

  return (
    <Component
      counts={{
        followedArtists: followedArtistsCount,
        initialFollowedArtists: initialFollowedArtistsCount.current,
        initialSavedArtworks: initialSavedArtworksCount.current,
        savedArtworks: savedArtworksCount,
      }}
    >
      {children}
    </Component>
  )
}

const ProgressiveOnboardingCountsFragmentContainer = createFragmentContainer(
  ProgressiveOnboardingCounts,
  {
    me: graphql`
      fragment ProgressiveOnboardingCounts_me on Me {
        counts {
          followedArtists
          savedArtworks
        }
      }
    `,
  }
)

interface ProgressiveOnboardingCountsQueryRendererProps {
  Component: Component
}

/**
 * Queries for and provides a counts object
 * augmented with what the values are initially on mount
 */
export const ProgressiveOnboardingCountsQueryRenderer: FC<ProgressiveOnboardingCountsQueryRendererProps> = ({
  children,
  Component,
}) => {
  const { isLoggedIn } = useSystemContext()

  if (!isLoggedIn) {
    return <>{children}</>
  }

  return (
    <SystemQueryRenderer<ProgressiveOnboardingCountsQuery>
      lazyLoad
      placeholder={children}
      query={graphql`
        query ProgressiveOnboardingCountsQuery {
          me {
            ...ProgressiveOnboardingCounts_me
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return children
        }

        if (!props?.me) {
          return children
        }

        return (
          <ProgressiveOnboardingCountsFragmentContainer
            Component={Component}
            me={props.me}
          >
            {children}
          </ProgressiveOnboardingCountsFragmentContainer>
        )
      }}
    />
  )
}