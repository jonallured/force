import { Theme, injectGlobalStyles, ToastsProvider } from "@artsy/palette"
import { RouteProps } from "System/Router/Route"
import { FC, useEffect } from "react"
import * as React from "react"
import { HeadProvider } from "react-head"
import { Environment, RelayEnvironmentProvider } from "react-relay"
import Events from "Utils/Events"
import { MatchingMediaQueries, MediaContextProvider } from "Utils/Responsive"
import { SiftContainer } from "Utils/SiftContainer"
import track from "react-tracking"
import { StickyProvider } from "Components/Sticky"
import { AuthIntentProvider } from "Utils/Hooks/useAuthIntent"
import { AuthDialogProvider } from "Components/AuthDialog/AuthDialogContext"
import { CookieConsentManager } from "Components/CookieConsentManager/CookieConsentManager"
import { DismissibleProvider } from "@artsy/dismissible"
import { PROGRESSIVE_ONBOARDING_KEYS } from "Components/ProgressiveOnboarding/progressiveOnboardingKeys"
import {
  AppPreferencesProvider,
  useAppPreferences,
} from "Apps/AppPreferences/useAppPreferences"
import { ClientContext } from "System/Router/Utils/clientAppContext"
import { ErrorBoundary } from "System/Components/ErrorBoundary"
import { SystemContextProvider } from "System/Contexts/SystemContext"
import { StyleSheetManager } from "styled-components"
import isPropValid from "@emotion/is-prop-valid"

export interface BootProps {
  children: React.ReactNode
  context: ClientContext
  headTags?: JSX.Element[]
  onlyMatchMediaQueries?: MatchingMediaQueries
  relayEnvironment: Environment
  routes: RouteProps[]
  user: User | null
}

const { GlobalStyles } = injectGlobalStyles()

export const Boot = track(undefined, {
  dispatch: Events.postEvent,
})((props: BootProps) => {
  /**
   * Let our end-to-end tests know that the app is hydrated and ready to go; and
   * if in prod, initialize Sentry.
   */
  useEffect(() => {
    document.body.setAttribute("data-test", "AppReady") //
  }, [])

  const {
    children,
    context,
    headTags = [],
    onlyMatchMediaQueries,
    ...rest
  } = props

  const contextProps = {
    ...rest,
    ...context,
  }

  return (
    <AppPreferencesProvider>
      <ThemeProvider>
        <GlobalStyles />

        <HeadProvider headTags={headTags}>
          <SystemContextProvider {...contextProps}>
            <EnvironmentProvider environment={props.relayEnvironment}>
              <ErrorBoundary>
                <MediaContextProvider onlyMatch={onlyMatchMediaQueries}>
                  <ToastsProvider>
                    <StickyProvider>
                      <AuthIntentProvider>
                        <AuthDialogProvider>
                          <DismissibleProvider
                            userID={props.user?.id}
                            keys={PROGRESSIVE_ONBOARDING_KEYS}
                          >
                            <CookieConsentManager>
                              <SiftContainer />

                              {children}
                            </CookieConsentManager>
                          </DismissibleProvider>
                        </AuthDialogProvider>
                      </AuthIntentProvider>
                    </StickyProvider>
                  </ToastsProvider>
                </MediaContextProvider>
              </ErrorBoundary>
            </EnvironmentProvider>
          </SystemContextProvider>
        </HeadProvider>
      </ThemeProvider>
    </AppPreferencesProvider>
  )
})

const EnvironmentProvider: FC<{ environment: Environment }> = ({
  children,
  environment,
}) => {
  if (process.env.NODE_ENV === "test") return <>{children}</>

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  )
}

const ThemeProvider: FC = ({ children }) => {
  const { preferences } = useAppPreferences()

  return (
    <Theme theme={preferences.theme}>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        {children}
      </StyleSheetManager>
    </Theme>
  )
}

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName, target) {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName)
  }
  // For other elements, forward all props
  return true
}
