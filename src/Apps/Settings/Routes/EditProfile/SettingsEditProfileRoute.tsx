import { Column, GridColumns, Join, Separator, Text } from "@artsy/palette"
import InfoIcon from "@artsy/icons/InfoIcon"
import { SettingsEditProfileFieldsFragmentContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileFields"
import { SettingsEditProfileRoute_me$data } from "__generated__/SettingsEditProfileRoute_me.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"

interface SettingsEditProfileRouteProps {
  me: SettingsEditProfileRoute_me$data
}

const SettingsEditProfileRoute: React.FC<SettingsEditProfileRouteProps> = ({
  me,
}) => {
  const isCollectorSummaryEnabled = !!useFeatureFlag(
    "diamond_collector-summary"
  )
  return (
    <GridColumns>
      {isCollectorSummaryEnabled && (
        <Column span={8} bg="black5" p={2} display="flex" gap={1}>
          <InfoIcon flexShrink={0} />
          <Text variant="sm-display">
            The information you provide here will be shared when you contact a
            gallery or make an offer.
          </Text>
        </Column>
      )}
      <Column span={8}>
        <Join separator={<Separator my={4} />}>
          <SettingsEditProfileFieldsFragmentContainer me={me} />
        </Join>
      </Column>
    </GridColumns>
  )
}

export const SettingsEditProfileRouteFragmentContainer = createFragmentContainer(
  SettingsEditProfileRoute,
  {
    me: graphql`
      fragment SettingsEditProfileRoute_me on Me {
        ...SettingsEditProfileAboutYou_me
        ...SettingsEditProfileArtistsYouCollect_me
        ...SettingsEditProfileFields_me
      }
    `,
  }
)
