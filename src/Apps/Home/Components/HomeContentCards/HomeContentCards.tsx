import React from "react"
import { HeroCarousel } from "Components/HeroCarousel/HeroCarousel"
import { HomeContentCard } from "./HomeContentCard"
import { createFragmentContainer, graphql } from "react-relay"
import { HomeContentCards_heroUnits$data } from "__generated__/HomeContentCards_heroUnits.graphql"
import { extractNodes } from "Utils/extractNodes"

interface HomeContentCardsProps {
  heroUnits: HomeContentCards_heroUnits$data
}

export const HomeContentCards: React.FC<HomeContentCardsProps> = ({
  heroUnits,
}) => {
  console.log({ heroUnits })
  const nodes = extractNodes(heroUnits)

  console.log({ nodes })

  return (
    <HeroCarousel>
      {nodes.map((card, index) => {
        return <HomeContentCard card={card} index={index} />
      })}
    </HeroCarousel>
  )
}

export const HomeContentCardsFragmentContainer = createFragmentContainer(
  HomeContentCards,
  {
    heroUnits: graphql`
      fragment HomeContentCards_heroUnits on HeroUnitConnection {
        edges {
          node {
            body
            credit
            image {
              imageURL
            }
            label
            linkText
            linkUrl
            title
          }
        }
      }
    `,
  }
)
