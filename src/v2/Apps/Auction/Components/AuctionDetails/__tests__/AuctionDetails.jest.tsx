import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionDetailsFragmentContainer } from "../AuctionDetails"
import { AuctionDetailsTestQuery } from "v2/__generated__/AuctionDetailsTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking", () => ({
  useTracking: jest.fn(),
}))

jest.mock("../AuctionInfoSidebar", () => ({
  AuctionInfoSidebarFragmentContainer: () => null,
}))

describe("AuctionDetails", () => {
  const mockUseTracking = useTracking as jest.Mock

  const { getWrapper } = setupTestWrapper<AuctionDetailsTestQuery>({
    Component: (props: any) => {
      return <AuctionDetailsFragmentContainer {...props} />
    },
    query: graphql`
      query AuctionDetailsTestQuery @relay_test_operation {
        sale(id: "foo") {
          ...AuctionDetails_sale
        }
      }
    `,
  })

  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("shows correct title", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        name: "Auction Name",
      }),
    })
    expect(wrapper.text()).toContain("Auction Name")
  })

  it("shows register button", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        name: "Auction Name",
        isRegistrationClosed: false,
      }),
    })
    expect(wrapper.find("RegisterButton").length).toBe(1)
  })

  it("shows formatted start time", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        formattedStartDateTime: "Starting in 20 minutes",
      }),
    })
    expect(wrapper.text()).toContain("Starting in 20 minutes")
  })

  it("shows add to calendar button", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        isClosed: false,
      }),
    })
    expect(wrapper.find("AddToCalendar").length).toBe(1)
  })

  it("shows sale description", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        description: "Auction description",
      }),
    })
    expect(wrapper.text()).toContain("Auction description")
  })

  it("shows the sidebar info", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("AuctionInfoSidebarFragmentContainer").length).toBe(1)
  })
})