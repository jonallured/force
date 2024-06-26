import { SystemContextProvider } from "System/SystemContext"
import { buildAppRoutes } from "System/Router/buildAppRoutes"
import { buildClientApp } from "System/Router/buildClientApp"
import { render, screen } from "@testing-library/react"

jest.mock("Components/NavBar/NavBar", () => ({
  NavBar: () => <div />,
}))

jest.mock("System/Router/Boot", () => ({
  Boot: ({ children }) => children,
}))

jest.mock("react-tracking", () => ({
  useTracking: () => ({
    trackEvent: x => x,
  }),
}))

jest.mock("Utils/Hooks/useAuthValidation")

jest.mock("Components/Footer/FooterDownloadAppBanner", () => ({
  FooterDownloadAppBanner: () => "Meet your new art advisor.",
}))

describe("AppShell", () => {
  it("renders a Footer", async () => {
    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: buildAppRoutes([
        {
          routes: [
            {
              path: "/foo",
              Component: () => <div />,
            },
          ],
        },
      ]),
    })

    render(
      <SystemContextProvider>
        <ClientApp />
      </SystemContextProvider>
    )

    expect(screen.getByText("Meet your new art advisor.")).toBeInTheDocument()
  })

  it("calls the matched routes `prepare` function if found", async () => {
    const onClientSideRender = jest.fn()
    const { ClientApp } = await buildClientApp({
      history: {
        protocol: "memory",
      },
      initialRoute: "/foo",
      routes: buildAppRoutes([
        {
          routes: [
            {
              path: "/foo",
              Component: () => <div />,
              onClientSideRender: ({ match }) => {
                expect(match.location.pathname).toBe("/foo")
                onClientSideRender()
              },
            },
          ],
        },
      ]),
    })

    render(
      <SystemContextProvider>
        <ClientApp />
      </SystemContextProvider>
    )

    expect(onClientSideRender).toHaveBeenCalledTimes(1)
  })
})
