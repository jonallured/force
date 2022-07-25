import {
  ConversationAppTestQuery,
  ConversationAppTestQueryRawResponse,
} from "__generated__/ConversationAppTestQuery.graphql"
import { screen } from "@testing-library/react"
import { MockedConversation } from "Apps/__tests__/Fixtures/Conversation"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { SystemContextProvider } from "System"
import { MockBoot } from "DevTools"
import { HeadProvider } from "react-head"
import { graphql } from "react-relay"
import { ConversationAppFragmentContainer } from "../ConversationApp"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<ConversationAppTestQuery>({
  Component: props => {
    return (
      <MockBoot>
        <HeadProvider>
          <SystemContextProvider
            user={{
              type: "NotAdmin",
            }}
          >
            {/* @ts-ignore */}
            <ConversationAppFragmentContainer me={props.me} />
          </SystemContextProvider>
        </HeadProvider>
      </MockBoot>
    )
  },
  query: graphql`
    query ConversationAppTestQuery @raw_response_type @relay_test_operation {
      me {
        ...ConversationApp_me
      }
    }
  `,
})

const pageInfo: NonNullable<
  NonNullable<
    ConversationAppTestQueryRawResponse["me"]
  >["conversationsConnection"]
>["pageInfo"] = {
  startCursor: "NQ",
  endCursor: "MQ",
  hasNextPage: true,
  hasPreviousPage: false,
}

describe("Conversation app", () => {
  beforeAll(() => {
    jest.resetAllMocks()
  })

  describe("as non admin user", () => {
    describe("having previous conversations", () => {
      it("renders conversations", () => {
        renderWithRelay({
          Me: () => ({
            id: "111",
          }),
          ConversationConnection: () => ({
            edges: [{ node: MockedConversation, cursor: "absc" }],
            pageInfo,
          }),
        })
        expect(screen.getByText("Ashkan Gallery")).toBeInTheDocument()
      })
    })

    describe("not having previous conversations", () => {
      it("shows an empty state when loading the conversationsConnection", () => {
        renderWithRelay({
          Me: () => ({
            id: "111",
          }),
          ConversationConnection: () => ({
            edges: [],
            pageInfo,
          }),
        })

        expect(
          screen.getByText("You don't have any messages yet.")
        ).toBeInTheDocument()
        expect(
          screen.getByText(
            "Contact galleries to purchase available work. You'll find your ongoing conversations here."
          )
        ).toBeInTheDocument()

        expect(screen.getByText("Explore artworks")).toBeInTheDocument()
        expect(screen.getByRole("link")).toHaveAttribute("href", "/collect")
      })
    })
  })
})