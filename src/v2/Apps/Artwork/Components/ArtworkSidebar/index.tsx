import { Box, Spacer, Join } from "@artsy/palette"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { AuctionTimerFragmentContainer } from "v2/Components/AuctionTimer"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarArtistsFragmentContainer } from "./ArtworkSidebarArtists"
import { ArtworkSidebarAuctionPartnerInfoFragmentContainer } from "./ArtworkSidebarAuctionPartnerInfo"
import { ArtworkSidebarBidActionFragmentContainer } from "./ArtworkSidebarBidAction"
import { ArtworkSidebarCommercialFragmentContainer } from "./ArtworkSidebarCommercial"
import { ArtworkSidebarCurrentBidInfoFragmentContainer } from "./ArtworkSidebarCurrentBidInfo"
import { ArtworkSidebarMetadataFragmentContainer } from "./ArtworkSidebarMetadata"
import { ArtworkSidebarPartnerInfoFragmentContainer } from "./ArtworkSidebarPartnerInfo"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkSidebar_artwork } from "v2/__generated__/ArtworkSidebar_artwork.graphql"
import { ArtworkSidebar_me } from "v2/__generated__/ArtworkSidebar_me.graphql"
import { ArtworkSidebarQuery } from "v2/__generated__/ArtworkSidebarQuery.graphql"
import { SystemContext } from "v2/System"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { AuthenticityCertificateFragmentContainer } from "../TrustSignals/AuthenticityCertificate"
import { SecurePaymentFragmentContainer } from "../TrustSignals/SecurePayment"
import { VerifiedSellerFragmentContainer } from "../TrustSignals/VerifiedSeller"
import { BuyerGuaranteeFragmentContainer } from "../TrustSignals/BuyerGuarantee"
import { ArtworkSidebarExtraLinksFragmentContainer } from "./ArtworkSidebarExtraLinks"

export interface ArtworkSidebarProps {
  artwork: ArtworkSidebar_artwork
  me: ArtworkSidebar_me
}

const ArtworkSidebarContainer = Box

export const ArtworkSidebar: React.FC<ArtworkSidebarProps> = ({
  artwork,
  me,
}) => {
  return (
    <ArtworkSidebarContainer data-test={ContextModule.artworkSidebar}>
      <ArtworkSidebarArtistsFragmentContainer artwork={artwork} />
      <Spacer mt={4} />
      <ArtworkSidebarMetadataFragmentContainer artwork={artwork} />

      {artwork.is_in_auction ? (
        <>
          <Spacer mt={2} />
          <Join separator={<Spacer mt={2} />}>
            <ArtworkSidebarAuctionPartnerInfoFragmentContainer
              artwork={artwork}
            />
            <ArtworkSidebarCurrentBidInfoFragmentContainer artwork={artwork} />
            <ArtworkSidebarBidActionFragmentContainer
              artwork={artwork}
              me={me}
            />
          </Join>

          {artwork.sale && !artwork.sale?.is_closed && (
            <>
              <Spacer mt={2} />
              <AuctionTimerFragmentContainer sale={artwork.sale} />
            </>
          )}
        </>
      ) : (
        <>
          <Spacer mt={2} />
          <ArtworkSidebarCommercialFragmentContainer artwork={artwork} />
          <ArtworkSidebarPartnerInfoFragmentContainer artwork={artwork} />
        </>
      )}
      <Join separator={<Spacer mt={2} />}>
        <AuthenticityCertificateFragmentContainer artwork={artwork} />
        <SecurePaymentFragmentContainer artwork={artwork} />
        <VerifiedSellerFragmentContainer artwork={artwork} />
        <BuyerGuaranteeFragmentContainer artwork={artwork} />
      </Join>
      <ArtworkSidebarExtraLinksFragmentContainer artwork={artwork} />
    </ArtworkSidebarContainer>
  )
}

export const ArtworkSidebarFragmentContainer = createFragmentContainer(
  ArtworkSidebar,
  {
    artwork: graphql`
      fragment ArtworkSidebar_artwork on Artwork {
        is_in_auction: isInAuction
        ...ArtworkSidebarArtists_artwork
        ...ArtworkSidebarMetadata_artwork
        ...ArtworkSidebarAuctionPartnerInfo_artwork
        ...ArtworkSidebarCurrentBidInfo_artwork
        ...ArtworkSidebarBidAction_artwork
        ...ArtworkSidebarCommercial_artwork
        ...ArtworkSidebarPartnerInfo_artwork
        ...ArtworkSidebarExtraLinks_artwork
        ...SecurePayment_artwork
        ...VerifiedSeller_artwork
        ...AuthenticityCertificate_artwork
        ...BuyerGuarantee_artwork
        sale {
          is_closed: isClosed
          ...AuctionTimer_sale
        }
      }
    `,
    me: graphql`
      fragment ArtworkSidebar_me on Me {
        ...ArtworkSidebarBidAction_me
      }
    `,
  }
)

export const ArtworkSidebarQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<ArtworkSidebarQuery>
      environment={relayEnvironment}
      variables={{ artworkID }}
      query={graphql`
        query ArtworkSidebarQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...ArtworkSidebar_artwork
          }
        }
      `}
      render={renderWithLoadProgress(ArtworkSidebarFragmentContainer)}
    />
  )
}
