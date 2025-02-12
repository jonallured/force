import { screen } from "@testing-library/react"
import { ConsignmentSubmissionStatusFragmentContainer } from "Components/Artwork/ConsignmentSubmissionStatus"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ConsignmentSubmissionStatusTestQuery } from "__generated__/ConsignmentSubmissionStatusTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("ConsignmentSubmissionStatus", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<ConsignmentSubmissionStatusTestQuery>({
      Component: props => {
        if (props.artwork) {
          return (
            <ConsignmentSubmissionStatusFragmentContainer {...(props as any)} />
          )
        }
        return null
      },
      query: graphql`
        query ConsignmentSubmissionStatusTestQuery @relay_test_operation {
          artwork(id: "artwork-id") {
            ...ConsignmentSubmissionStatus_artwork
          }
        }
      `,
    })

  it("displayas submission status when Approved", () => {
    renderWithRelay({
      Artwork: () => ({
        internalID: "artwork-id",
        consignmentSubmission: {
          internalID: "submission-id",
          state: "APPROVED",
          stateLabel: "Approved",
          actionLabel: "Complete Listing",
        },
      }),
    })

    expect(screen.getByText("Approved")).toBeInTheDocument()
    expect(screen.getByText("Complete Listing")).toBeInTheDocument()
  })

  it("displayas submission status when Listed", () => {
    renderWithRelay({
      Artwork: () => ({
        internalID: "artwork-id",
        isListed: true,
        consignmentSubmission: {},
      }),
    })

    expect(screen.getByText("Listed")).toBeInTheDocument()
    expect(screen.queryByText("Complete Listing")).not.toBeInTheDocument()
  })
})
