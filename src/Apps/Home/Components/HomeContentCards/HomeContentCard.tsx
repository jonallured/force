import * as React from "react"
import {
  Box,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
  Button,
  GridColumns,
  Column,
} from "@artsy/palette"
import { cropped } from "Utils/resized"
import { RouterLink } from "System/Router/RouterLink"
import { Media } from "Utils/Responsive"
import { HomeHeroUnitCredit } from "Apps/Home/Components/HomeHeroUnits/HomeHeroUnitCredit"

interface HomeContentCardProps {
  card: any
  index: number
  onClick?: () => void
}

export const HomeContentCard: React.FC<HomeContentCardProps> = props => {
  return (
    <Box width="100%" height="100%">
      <Media at="xs">
        <HomeContentCardSmall {...props} />
      </Media>

      <Media greaterThan="xs">
        <HomeContentCardLarge {...props} />
      </Media>
    </Box>
  )
}

const HomeContentCardSmall: React.FC<HomeContentCardProps> = ({
  card,
  index,
  onClick,
}) => {
  const imageUrl = card.image?.imageURL
  const image = imageUrl && cropped(imageUrl, { width: 500, height: 333 })

  return (
    <RouterLink
      aria-label={`${card.title} - ${card.body}`}
      bg="black5"
      display="block"
      height="100%"
      onClick={onClick}
      textDecoration="none"
      to={card.linkUrl}
      width="100%"
    >
      <ResponsiveBox
        aspectHeight={2}
        aspectWidth={3}
        bg="black30"
        maxWidth="100%"
      >
        {image && (
          <Image
            alt=""
            height="100%"
            lazyLoad={index > 0}
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
          />
        )}
      </ResponsiveBox>

      <Box p={4}>
        <Text as={index === 0 ? "h1" : "h2"} variant="lg-display" lineClamp={3}>
          {card.title}
        </Text>

        <Spacer y={1} />

        <Text variant="xs" color="black60" lineClamp={4}>
          {card.body}
        </Text>

        <Spacer y={1} />

        <Text variant="xs">{card.linkText}</Text>
      </Box>
    </RouterLink>
  )
}

const HomeContentCardLarge: React.FC<HomeContentCardProps> = ({
  card,
  index,
  onClick,
}) => {
  const imageUrl = card.image?.imageURL
  const image = imageUrl && cropped(imageUrl, { width: 1270, height: 500 })

  return (
    <RouterLink
      aria-label={`${card.title} - ${card.body}`}
      display="block"
      onClick={onClick}
      textDecoration="none"
      to={card.linkUrl}
    >
      <GridColumns bg="black5">
        <Column span={6}>
          <Box height={[300, 400, 500]} position="relative" bg="black30">
            {image && (
              <Image
                alt=""
                height="100%"
                lazyLoad={index > 0}
                src={image.src}
                srcSet={image.srcSet}
                style={{ objectFit: "cover" }}
                width="100%"
              />
            )}

            {card.credit && (
              <Box
                position="absolute"
                bottom={0}
                left={0}
                width="100%"
                px={2}
                pb={1}
                pt={6}
                background="linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 100%);"
              >
                <HomeHeroUnitCredit>{card.credit}</HomeHeroUnitCredit>
              </Box>
            )}
          </Box>
        </Column>

        <Column span={6}>
          <GridColumns height="100%">
            <Column
              display="flex"
              flexDirection="column"
              justifyContent="center"
              py={4}
              span={8}
              start={3}
            >
              {card.label && (
                <>
                  <Text variant="xs">{card.label}</Text>

                  <Spacer y={1} />
                </>
              )}

              <Text
                as={index === 0 ? "h1" : "h2"}
                lineClamp={3}
                variant={["lg-display", "xl", "xl"]}
              >
                {card.title}
              </Text>

              <Spacer y={2} />

              <Text
                color="black60"
                lineClamp={4}
                variant={["xs", "sm-display", "lg-display"]}
              >
                {card.body}
              </Text>

              <Spacer y={[2, 2, 4]} />

              <GridColumns>
                <Column span={[12, 12, 6]}>
                  <Button variant="secondaryBlack" width="100%" tabIndex={-1}>
                    {card.linkText}
                  </Button>
                </Column>
              </GridColumns>
            </Column>
          </GridColumns>
        </Column>
      </GridColumns>
    </RouterLink>
  )
}
