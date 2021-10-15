import React from "react"
import { mount, ReactWrapper } from "enzyme"
import {
  ArtworkDetailsForm,
  ArtworkDetailsFormModel,
} from "../Components/ArtworkDetailsForm"
import { Formik } from "formik"
import { initialValues } from "../ArtworkDetails"
import { LabeledInput } from "@artsy/palette"

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: jest.fn(),
}))

import { useRouter } from "v2/System/Router/useRouter"

const renderArtworkForm = (values: ArtworkDetailsFormModel) =>
  mount(
    <Formik initialValues={values} onSubmit={jest.fn()}>
      <ArtworkDetailsForm />
    </Formik>
  )

describe("ArtworkDetailsForm", () => {
  let wrapper: ReactWrapper
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      match: { params: { id: null } },
    }))
    wrapper = renderArtworkForm(initialValues)
  })

  it("renders correctly initial fields", () => {
    expect(wrapper.find("input[name='artist']")).toBeTruthy()
    expect(wrapper.find("input[name='year']")).toBeTruthy()
    expect(wrapper.find("input[name='title']")).toBeTruthy()
    expect(wrapper.find("select[name='medium']")).toBeTruthy()
    expect(wrapper.find("select[name='rarity']")).toBeTruthy()
    expect(wrapper.find("input[name='height']")).toBeTruthy()
    expect(wrapper.find("input[name='width']")).toBeTruthy()
    expect(wrapper.find("input[name='depth']")).toBeTruthy()
    expect(wrapper.find("Radio[value='in']")).toBeTruthy()
    expect(wrapper.find("Radio[value='cm']")).toBeTruthy()
  })

  describe("Rarity Select", () => {
    it("if not 'Limited Edition' doesn't render Edition fields", () => {
      expect(wrapper.find("input[name='editionNumber']").length).toBe(0)
      expect(wrapper.find("input[name='editionSize']").length).toBe(0)

      wrapper.find("select[name='rarity']").simulate("change", {
        target: { name: "rarity", value: "unique" },
      })

      expect(wrapper.find("input[name='editionNumber']").length).toBe(0)
      expect(wrapper.find("input[name='editionSize']").length).toBe(0)

      wrapper.find("select[name='rarity']").simulate("change", {
        target: { name: "rarity", value: "open edition" },
      })

      expect(wrapper.find("input[name='editionNumber']").length).toBe(0)
      expect(wrapper.find("input[name='editionSize']").length).toBe(0)

      wrapper.find("select[name='rarity']").simulate("change", {
        target: { name: "rarity", value: "unknown edition" },
      })

      expect(wrapper.find("input[name='editionNumber']").length).toBe(0)
      expect(wrapper.find("input[name='editionSize']").length).toBe(0)
    })

    it("if 'Limited Edition' renders Edition fields", () => {
      wrapper.find("select[name='rarity']").simulate("change", {
        target: { name: "rarity", value: "limited edition" },
      })

      expect(wrapper.find("input[name='editionNumber']")).toBeTruthy()
      expect(wrapper.find("input[name='editionSize']")).toBeTruthy()
    })
  })

  it("if units are 'in' renders size fields correctly", () => {
    const sizeFields = wrapper.find(LabeledInput)

    sizeFields.forEach((node: ReactWrapper) => {
      expect(node.text()).toBe("in")
    })
  })

  it("if units are 'cm' renders size fields correctly", () => {
    wrapper.find("Radio[value='cm']").simulate("click")
    const sizeFields = wrapper.find(LabeledInput)

    sizeFields.forEach((node: ReactWrapper) => {
      expect(node.text()).toBe("cm")
    })
  })
})