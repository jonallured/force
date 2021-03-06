import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import { Flex, Shelf, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistWorksForSaleRail_artist } from "v2/__generated__/ArtistWorksForSaleRail_artist.graphql"
import { scrollToTop } from "../Utils/scrollToTop"

interface ArtistWorksForSaleRailProps {
  artist: ArtistWorksForSaleRail_artist
}

const ArtistWorksForSaleRail: React.FC<ArtistWorksForSaleRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const nodes = extractNodes(artist.artworksConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      <Flex justifyContent="space-between">
        <Text variant="lg" mb={4} as="h2">
          Works for Sale
        </Text>

        <RouterLink
          to={`/artist/${artist.slug}/works-for-sale`}
          onClick={() => {
            scrollToTop()

            tracking.trackEvent(
              clickedEntityGroup({
                contextModule: ContextModule.worksForSaleRail,
                contextPageOwnerId,
                contextPageOwnerSlug,
                contextPageOwnerType: contextPageOwnerType!,
                destinationPageOwnerType: OwnerType.artist,
                destinationPageOwnerId: artist.internalID,
                destinationPageOwnerSlug: artist.slug,
                type: "viewAll",
              })
            )
          }}
        >
          <Text variant="sm">View all works</Text>
        </RouterLink>
      </Flex>

      <Shelf data-test="worksForSaleRail">
        {nodes.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              contextModule={ContextModule.worksForSaleRail}
              hidePartnerName
              key={index}
              showExtended={false}
              showMetadata
              lazyLoad
              onClick={() => {
                tracking.trackEvent(
                  clickedEntityGroup({
                    contextModule: ContextModule.worksForSaleRail,
                    contextPageOwnerId,
                    contextPageOwnerSlug,
                    // @ts-expect-error STRICT_NULL_CHECK
                    contextPageOwnerType,
                    destinationPageOwnerType: OwnerType.artwork,
                    destinationPageOwnerId: node.internalID,
                    destinationPageOwnerSlug: node.slug,
                    horizontalSlidePosition: index + 1,
                    type: "thumbnail",
                  })
                )
              }}
            />
          )
        })}
      </Shelf>
    </>
  )
}

export const ArtistWorksForSaleRailFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleRail,
  {
    artist: graphql`
      fragment ArtistWorksForSaleRail_artist on Artist {
        artworksConnection(first: 20, sort: AVAILABILITY_ASC) {
          edges {
            node {
              internalID
              slug
              ...ShelfArtwork_artwork @arguments(width: 200)
            }
          }
        }
        internalID
        slug
      }
    `,
  }
)
