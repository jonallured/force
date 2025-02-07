import { Rail } from "Components/Rail/Rail"
import type { ArtistSeriesRail_collectionGroup$data } from "__generated__/ArtistSeriesRail_collectionGroup.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesRailContainer as ArtistSeriesEntity } from "./ArtistSeriesEntity"

export interface ArtistSeriesRailProps {
  collectionGroup: ArtistSeriesRail_collectionGroup$data
}
export const ArtistSeriesRail: React.FC<
  React.PropsWithChildren<ArtistSeriesRailProps>
> = ({ collectionGroup: { members, name } }) => {
  return (
    <Rail
      title={name}
      getItems={() => {
        return members.map((slide, slideIndex) => {
          return (
            <ArtistSeriesEntity
              key={slide.slug || slideIndex}
              member={slide}
              itemNumber={slideIndex}
            />
          )
        })
      }}
    />
  )
}

export const ArtistSeriesRailContainer = createFragmentContainer(
  ArtistSeriesRail as React.FC<React.PropsWithChildren<ArtistSeriesRailProps>>,
  {
    collectionGroup: graphql`
      fragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
        groupType
        name
        members {
          slug
          ...ArtistSeriesEntity_member
        }
      }
    `,
  },
)
