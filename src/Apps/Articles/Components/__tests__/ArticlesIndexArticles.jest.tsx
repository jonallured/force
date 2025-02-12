import { screen } from "@testing-library/react"
import { ArticlesIndexArticlesPaginationContainer } from "Apps/Articles/Components/ArticlesIndexArticles"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Apps/Article/useArticleTracking", () => ({
  useArticleTracking: () => ({}),
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: ArticlesIndexArticlesPaginationContainer,
  query: graphql`
    query ArticlesIndexArticles_test_Query($after: String)
    @relay_test_operation {
      viewer {
        ...ArticlesIndexArticles_viewer @arguments(after: $after)
      }
    }
  `,
})

describe("ArticlesIndexArticles", () => {
  it("renders the articles", () => {
    renderWithRelay({
      PageInfo: () => ({ hasNextPage: false, endCursor: null }),
      Article: () => ({
        thumbnailTitle: "Example Article",
        publishedAt: "March 20th, 2020",
        byline: "Example Author",
      }),
    })

    expect(screen.getByText("Example Article")).toBeInTheDocument()
    expect(screen.getByText("March 20th, 2020")).toBeInTheDocument()
    expect(screen.getByText("Example Author")).toBeInTheDocument()
  })

  it("renders an empty state", () => {
    renderWithRelay({
      ArticleConnection: () => ({
        edges: [],
      }),
    })

    expect(screen.getByText("Nothing yet.")).toBeInTheDocument()
  })
})
