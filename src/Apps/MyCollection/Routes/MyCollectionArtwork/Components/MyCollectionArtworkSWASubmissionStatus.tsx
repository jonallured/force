import { OwnerType } from "@artsy/cohesion"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import {
  Box,
  Button,
  Clickable,
  Flex,
  ModalDialog,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  BASIC_STEPS,
  INITIAL_EDIT_STEP,
  INITIAL_POST_APPROVAL_STEP,
  INITIAL_STEP,
  PRE_SUBMITTED_STEPS,
  useTestSubmissionState,
} from "Apps/Sell/SellFlowContext"
import { usePreviousSubmission } from "Apps/Sell/Utils/previousSubmissionUtils"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import type {
  MyCollectionArtworkSWASubmissionStatus_artwork$data,
  MyCollectionArtworkSWASubmissionStatus_artwork$key,
} from "__generated__/MyCollectionArtworkSWASubmissionStatus_artwork.graphql"
import type React from "react"
import { useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface Props {
  artwork: MyCollectionArtworkSWASubmissionStatus_artwork$key
}

export const MyCollectionArtworkSWASubmissionStatus: React.FC<
  React.PropsWithChildren<Props>
> = props => {
  const { trackEvent } = useTracking()
  const { testSubmissionState } = useTestSubmissionState()
  const [isSubmissionStatusModalOpen, setIsSubmissionStatusModalOpen] =
    useState(false)

  const artwork = useFragment(submissionStatusFragment, props.artwork)

  const { consignmentSubmission: submission } = artwork

  const buttonURL = useGetButtonURL(artwork)

  if (!submission) return null

  // Setting the submission state as the URL query parameter to allow testing the complete Sell flow with different submission states with integrity.
  const submissionState = testSubmissionState ?? submission.state

  const isListed = artwork?.isListed
  const stateLabel = isListed ? "Listed" : submission.stateLabel
  const buttonLabel = isListed ? "View Listing" : submission.buttonLabel

  const buttonVariant = PRE_SUBMITTED_STEPS.includes(submissionState)
    ? "primaryBlack"
    : "secondaryBlack"
  const stateHelpMessage = getStateHelpMessage(submission, isListed)

  const trackEditSubmission = () => {
    trackEvent({
      action: "tappedEditSubmission",
      context_page_owner_type: OwnerType.myCollectionArtwork,
      context_page_owner_id: artwork.internalID,
      destination_page_owner_type: OwnerType.consignmentFlow,
      submission_id: submission.internalID,
      submission_state: submissionState,
      subject: buttonLabel,
      platform: "web",
    })
  }

  return (
    <Box>
      <Media greaterThanOrEqual="sm">
        <Separator my={4} />
      </Media>

      <Text variant="xs" mb={[0.5, 1]}>
        <Flex justifyContent="space-between">
          Submission Status
          <Media lessThan="sm">
            <Clickable
              onClick={() => setIsSubmissionStatusModalOpen(true)}
              textDecoration="underline"
              color="black60"
            >
              What is this?
            </Clickable>
          </Media>
        </Flex>
      </Text>

      <Text variant={["sm", "md"]} fontWeight="400">
        {stateLabel}
      </Text>

      <Media lessThan="sm">
        {!!submission.actionLabel && !!buttonURL && (
          <RouterLink
            onClick={() => {
              trackEditSubmission()
            }}
            to={buttonURL}
            textDecoration="none"
            color="orange100"
          >
            <Flex alignItems="center">
              <Text variant="sm-display">{submission.actionLabel}</Text>

              <ChevronRightIcon ml={0.5} size={16} />
            </Flex>
          </RouterLink>
        )}

        {!!isSubmissionStatusModalOpen && (
          <ModalDialog onClose={() => setIsSubmissionStatusModalOpen(false)}>
            <Box>
              <Text variant="xs" mb={1}>
                Submission Status
              </Text>

              <Text variant="md" fontWeight="400">
                {stateLabel}
              </Text>

              {!!submission.actionLabel && (
                <Text variant="md" fontWeight="400" color="orange100">
                  {submission.actionLabel}
                </Text>
              )}

              <Spacer y={1} />

              <Text variant="sm" color="black60">
                {stateHelpMessage}
              </Text>

              <Spacer y={2} />

              {!!buttonURL && (
                <Button
                  variant={buttonVariant}
                  // @ts-ignore
                  as={RouterLink}
                  onClick={() => {
                    trackEditSubmission()
                  }}
                  to={buttonURL}
                  width="100%"
                  mb={2}
                >
                  {buttonLabel}
                </Button>
              )}
            </Box>
          </ModalDialog>
        )}
      </Media>

      <Media greaterThanOrEqual="sm">
        {!!submission.actionLabel && (
          <Text variant="md" fontWeight="400" color="orange100">
            {submission.actionLabel}
          </Text>
        )}

        <Spacer y={1} />

        <Text variant="sm" color="black60">
          {stateHelpMessage}
        </Text>

        <Spacer y={2} />

        {!!buttonURL && (
          <Button
            variant={buttonVariant}
            // @ts-ignore
            as={RouterLink}
            onClick={() => {
              trackEditSubmission()
            }}
            to={buttonURL}
          >
            {buttonLabel}
          </Button>
        )}
      </Media>
    </Box>
  )
}

const submissionStatusFragment = graphql`
  fragment MyCollectionArtworkSWASubmissionStatus_artwork on Artwork {
    internalID
    listedArtworksConnection(first: 1) {
      edges {
        node {
          internalID
        }
      }
    }
    isListed
    consignmentSubmission {
      actionLabel
      buttonLabel
      externalID
      internalID
      state
      stateLabel
      stateHelpMessage
    }
  }
`

const useGetButtonURL = (
  artwork: MyCollectionArtworkSWASubmissionStatus_artwork$data,
): string | null => {
  const { submissionID, step } = usePreviousSubmission()
  const { testSubmissionQueryParams, testSubmissionState } =
    useTestSubmissionState()

  const submission = artwork.consignmentSubmission

  const submissionState = testSubmissionState ?? submission?.state

  if (!submissionState) return null

  const listedArtwork = extractNodes(artwork.listedArtworksConnection)[0]

  // The artwork has been listed on Artsy.
  if (listedArtwork) {
    return `/artwork/${listedArtwork?.internalID}`
  }

  if (!submission) return null

  // Do not link to the initial artist step.
  const previousStep =
    submissionID === submission.externalID && step !== INITIAL_STEP && step

  // Linking to the previous step does not work in all cases because we only store the current step for the most recent submission.
  const currentStep = previousStep || INITIAL_EDIT_STEP
  const currentPostApprovalStep =
    (!BASIC_STEPS.includes(previousStep as any) && previousStep) ||
    INITIAL_POST_APPROVAL_STEP

  if (
    ["DRAFT", "SUBMITTED", "RESUBMITTED", "PUBLISHED"].includes(submissionState)
  ) {
    return (
      `/sell/submissions/${submission.internalID}/${currentStep}` +
      testSubmissionQueryParams
    )
  }

  if (["APPROVED"].includes(submissionState)) {
    return (
      `/sell/submissions/${submission.internalID}/${currentPostApprovalStep}` +
      testSubmissionQueryParams
    )
  }

  return null
}

const getStateHelpMessage = (submission, isListed): JSX.Element => {
  if (isListed) {
    return <>Your artwork has been successfully listed on Artsy.</>
  }

  if (submission.state === "REJECTED") {
    return (
      <>
        {submission.stateHelpMessage} Find out more about our{" "}
        <RouterLink
          to="https://support.artsy.net/s/article/What-items-do-you-accept"
          color="black60"
          inline
        >
          submission criteria
        </RouterLink>
        .
      </>
    )
  }

  return submission.stateHelpMessage
}
