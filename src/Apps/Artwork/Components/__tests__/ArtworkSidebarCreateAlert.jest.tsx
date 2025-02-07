import { fireEvent, screen, waitFor } from "@testing-library/react"
import { ArtworkSidebarCreateAlertFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCreateAlert"
import { AlertProvider } from "Components/Alert/AlertProvider"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type { ArtworkSidebarCreateAlert_Test_Query } from "__generated__/ArtworkSidebarCreateAlert_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { type MockEnvironment, createMockEnvironment } from "relay-test-utils"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("System/Hooks/useSystemContext")

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: Artwork.internalID,
    contextPageOwnerSlug: Artwork.slug,
    contextPageOwnerType: "artwork",
  })),
}))

const relayEnv: MockEnvironment = createMockEnvironment()

const { renderWithRelay } =
  setupTestWrapperTL<ArtworkSidebarCreateAlert_Test_Query>({
    Component: (props: any) => {
      return (
        <AlertProvider>
          <ArtworkSidebarCreateAlertFragmentContainer artwork={props.artwork} />
        </AlertProvider>
      )
    },
    query: graphql`
      query ArtworkSidebarCreateAlert_Test_Query @relay_test_operation {
        artwork(id: "test-artwork-id") {
          ...ArtworkSidebarCreateAlert_artwork
        }
      }
    `,
  })

describe("ArtworkSidebarCreateAlert", () => {
  const mockuseTracking = useTracking as jest.Mock
  const trackEvent = jest.fn()
  const mockuseSystemContext = useSystemContext as jest.Mock

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent,
    }))

    mockuseSystemContext.mockImplementation(() => {
      return {
        isLoggedIn: true,
        relayEnvironment: relayEnv,
      }
    })
  })

  it("should not render when an artwork is ineligible for alerts", () => {
    renderWithRelay({
      Artwork: () => ({ ...Artwork, isEligibleToCreateAlert: false }),
    })

    expect(screen.queryByText("Create Alert")).not.toBeInTheDocument()
  })

  // FIXME: REACT_18_UPGRADE
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("should correctly render pills", async () => {
    const { mockResolveLastOperation } = renderWithRelay(
      {
        Artwork: () => Artwork,
      },
      {},
      relayEnv,
    )

    fireEvent.click(screen.getByText("Create Alert"))

    const mockedPreviewResolver = {
      Viewer: () => ({
        previewSavedSearch: {
          labels: [
            {
              displayValue: "Banksy",
              field: "artistIDs",
              value: "artist-id",
            },
            {
              displayValue: "Limited Edition",
              field: "attributionClass",
              value: "limited edition",
            },
            {
              displayValue: "Print",
              field: "additionalGeneIDs",
              value: "prints",
            },
          ],
        },
      }),
    }

    mockResolveLastOperation(mockedPreviewResolver)

    await waitFor(() => {
      expect(screen.getByText("Banksy")).toBeInTheDocument()
      expect(screen.getByText("Limited Edition")).toBeInTheDocument()
      expect(screen.getByText("Print")).toBeInTheDocument()
    })
  })

  it("should correctly track event when `Create Alert` button is pressed", () => {
    renderWithRelay({
      Artwork: () => Artwork,
    })

    fireEvent.click(screen.getByText("Create Alert"))

    expect(trackEvent).toHaveBeenCalledWith({
      action: "clickedCreateAlert",
      context_page_owner_type: "artwork",
      context_page_owner_id: "artwork-id",
      context_page_owner_slug: "artwork-slug",
    })
  })
})

const Artwork = {
  slug: "artwork-slug",
  internalID: "artwork-id",
  isEligibleToCreateAlert: true,
}
