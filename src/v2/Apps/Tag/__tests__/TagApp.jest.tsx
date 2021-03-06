import React from "react"
import { Meta } from "react-head"
import { TagAppFragmentContainer } from "../TagApp"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { TagApp_Test_Query } from "v2/__generated__/TagApp_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")
jest.mock("../Components/TagArtworkFilter", () => ({
  TagArtworkFilterRefetchContainer: () => <div />,
}))

const { getWrapper } = setupTestWrapper<TagApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <TagAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query TagApp_Test_Query {
      tag(id: "example") {
        ...TagApp_tag
      }
    }
  `,
})

describe("TagApp", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Tag: () => ({
        name: "Example Tag",
      }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Example Tag")
  })

  it("renders meta description from query", () => {
    const wrapper = getWrapper({
      Tag: () => ({
        description: "Tag Description",
      }),
    })

    for (let i = 1; i <= 3; i++) {
      expect(wrapper.find(Meta).at(i).prop("content")).toEqual(
        "Tag Description"
      )
    }
  })

  it("renders fallback meta description", () => {
    const wrapper = getWrapper({
      Tag: () => ({
        name: "Example",
        description: null,
      }),
    })

    for (let i = 1; i <= 3; i++) {
      expect(wrapper.find(Meta).at(i).prop("content")).toEqual(
        "Browse all artworks with the Example tag on Artsy. Artsy has the largest collection of art on the Web; browse art by subject matter, medium, size and price."
      )
    }
  })
})
