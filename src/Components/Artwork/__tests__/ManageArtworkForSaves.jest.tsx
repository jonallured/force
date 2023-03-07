import { Button } from "@artsy/palette"
import { fireEvent, render, screen } from "@testing-library/react"
import {
  ManageArtworkForSavesProvider,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { MockBoot } from "DevTools/MockBoot"
import { useMutation } from "Utils/Hooks/useMutation"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"
import { MockResolvers } from "relay-test-utils/lib/RelayMockPayloadGenerator"

jest.unmock("react-relay")
jest.mock("Utils/Hooks/useMutation")

describe("ManageArtworkForSaves", () => {
  const relayEnv = createMockEnvironment()
  const submitMutation = jest.fn()
  const mockUseMutation = useMutation as jest.Mock

  beforeEach(() => {
    mockUseMutation.mockImplementation(() => {
      return { submitMutation }
    })
  })

  afterEach(() => {
    relayEnv.mockClear()
  })

  const TestRenderer = () => {
    return (
      <MockBoot relayEnvironment={relayEnv}>
        <ManageArtworkForSavesProvider>
          <TestButton />
        </ManageArtworkForSavesProvider>
      </MockBoot>
    )
  }

  const renderAndOpenModal = () => {
    render(<TestRenderer />)

    fireEvent.click(screen.getByText("Open Modal"))

    const mockResolvers: MockResolvers = {
      Me: () => ({
        defaultSaves: null,
        collectionsConnection: {
          edges: [customListNodeOne, customListNodeTwo],
        },
      }),
    }

    relayEnv.mock.resolveMostRecentOperation(operation => {
      return MockPayloadGenerator.generate(operation, mockResolvers)
    })
  }

  it("the modal should NOT be displayed by default", () => {
    render(<TestRenderer />)

    const modalTitle = "Select lists for this artwork"
    expect(screen.queryByText(modalTitle)).not.toBeInTheDocument()
  })

  it("the modal should be displayed when `artwork` is not `null`", () => {
    renderAndOpenModal()

    const modalTitle = "Select lists for this artwork"
    expect(screen.getByText(modalTitle)).toBeInTheDocument()
  })

  it("should render lists", () => {
    renderAndOpenModal()

    expect(screen.getByText("List 1")).toBeInTheDocument()
    expect(screen.getByText("List 2")).toBeInTheDocument()
  })

  it("should reset state when modal was closed", () => {
    renderAndOpenModal()

    fireEvent.click(screen.getByText("List 1"))
    fireEvent.click(screen.getByText("List 2"))

    expect(screen.getByText("2 lists selected")).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText("Close"))
    fireEvent.click(screen.getByText("Open Modal"))

    expect(screen.getByText("0 lists selected")).toBeInTheDocument()
  })

  describe("Create a new list modal", () => {
    const renderAndOpenCreateListModal = () => {
      renderAndOpenModal()

      fireEvent.click(screen.getByText("Create New List"))
    }

    it("should NOT be displayed by default", () => {
      renderAndOpenModal()

      expect(screen.queryByText("Create a new list")).not.toBeInTheDocument()
    })

    it("should be opened when `Create New List` button is clicked", () => {
      renderAndOpenCreateListModal()

      expect(screen.getByText("Create a new list")).toBeInTheDocument()
    })

    it("should be possible to return to the prev modal", () => {
      renderAndOpenCreateListModal()

      fireEvent.click(screen.getByText("Back"))

      const expectedModalTitle = "Select lists for this artwork"
      expect(screen.getByText(expectedModalTitle)).toBeInTheDocument()
    })

    it("should return info about the created list to the prev modal", async () => {
      submitMutation.mockImplementation(() => {
        return {
          createCollection: {
            responseOrError: {
              collection: {
                internalID: "created-list-id",
              },
            },
          },
        }
      })

      renderAndOpenCreateListModal()

      fireEvent.change(screen.getByRole("textbox"), {
        target: {
          value: "List Name",
        },
      })
      fireEvent.click(screen.getByText("Create List"))

      const expectedModalTitle = "Select lists for this artwork"
      const title = "List created"
      const message = 'Artwork has been added to "List Name"'

      expect(await screen.findByText(expectedModalTitle)).toBeInTheDocument()
      expect(screen.getByText(title)).toBeInTheDocument()
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })
})

const TestButton = () => {
  const { dispatch } = useManageArtworkForSavesContext()

  const openModal = () => {
    dispatch({
      type: "SET_ARTWORK",
      payload: {
        id: "artwork-id",
        title: "Artwork Title, 2023",
        imageURL: null,
      },
    })
  }

  return <Button onClick={openModal}>Open Modal</Button>
}

const customListNodeOne = {
  node: {
    internalID: "list-one",
    name: "List 1",
    isSavedArtwork: false,
  },
}

const customListNodeTwo = {
  node: {
    internalID: "list-two",
    name: "List 2",
    isSavedArtwork: false,
  },
}