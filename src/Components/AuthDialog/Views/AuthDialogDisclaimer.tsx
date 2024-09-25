import { FC } from "react"
import { SkeletonText, Stack, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { isTouch } from "Utils/device"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface AuthDialogDisclaimerProps {}

export const AuthDialogDisclaimer: FC<AuthDialogDisclaimerProps> = props => {
  const { loading, isAutomaticallySubscribed } = useCountryCode()

  if (loading) {
    return <AuthDialogDisclaimerSkeleton />
  }

  return (
    <Stack gap={1}>
      <Text
        variant="xs"
        color="black60"
        textAlign="center"
        data-testid="disclaimer"
      >
        By {isTouch ? "tapping" : "clicking"} Sign Up or Continue with Email,
        Apple, Google, or Facebook, you agree to Artsy’s{" "}
        <AuthDialogDisclaimerLink inline to="/terms" target="_blank">
          Terms and Conditions
        </AuthDialogDisclaimerLink>{" "}
        and{" "}
        <AuthDialogDisclaimerLink inline to="/privacy" target="_blank">
          Privacy Policy
        </AuthDialogDisclaimerLink>
        {isAutomaticallySubscribed && <> and to receiving emails from Artsy</>}.
      </Text>

      <Text variant="xs" color="black60" textAlign="center">
        This site is protected by reCAPTCHA and the{" "}
        <AuthDialogDisclaimerLink
          inline
          to="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Privacy Policy
        </AuthDialogDisclaimerLink>{" "}
        and{" "}
        <AuthDialogDisclaimerLink
          inline
          to="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Service
        </AuthDialogDisclaimerLink>{" "}
        apply.
      </Text>
    </Stack>
  )
}

export const AuthDialogDisclaimerSkeleton: FC = () => {
  return (
    <Stack gap={1}>
      <SkeletonText
        variant="xs"
        textAlign="center"
        data-testid="skeleton-disclaimer"
      >
        By clicking Sign Up or Continue with Email, Apple, Google, or Facebook,
        you agree to Artsy’s Terms and Conditions and Privacy Policy.
      </SkeletonText>

      <SkeletonText variant="xs" textAlign="center">
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply.
      </SkeletonText>
    </Stack>
  )
}

const AuthDialogDisclaimerLink = styled(RouterLink)`
  color: ${themeGet("colors.black100")};
`