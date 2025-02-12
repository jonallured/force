import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import type { SentConsignmentInquiry } from "@artsy/cohesion/dist/Schema/Events/Consignments"
import { Button, Spacer, Text, useToasts } from "@artsy/palette"
import { validateContactInformationValidationSchema } from "Apps/MyCollection/Routes/PriceEstimate/utils/contactInformationValidationSchema"
import {
  ConsignmentInquiryForm,
  type ConsignmentInquiryFormModel,
} from "Apps/Sell/Routes/ConsignmentInquiry/Components/ConsignmentInquiryForm"
import { ConsignmentInquiryFormAbandonEditModal } from "Apps/Sell/Routes/ConsignmentInquiry/Components/ConsignmentInquiryFormAbandonEdit"
import { useCreateConsignmentInquiry } from "Apps/Sell/Routes/ConsignmentInquiry/utils/useCreateConsignmentInquiry"
import { consignmentInquiryValidationSchema } from "Apps/Sell/Routes/ConsignmentInquiry/utils/validation"
import { TopContextBar } from "Components/TopContextBar"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { COUNTRY_CODES } from "Utils/countries"
import createLogger from "Utils/logger"
import { recaptcha } from "Utils/recaptcha"
import type { ConsignmentInquiry_me$data } from "__generated__/ConsignmentInquiry_me.graphql"
import type { ConsignmentInquiry_viewer$data } from "__generated__/ConsignmentInquiry_viewer.graphql"
import type { CreateConsignmentInquiryMutationInput } from "__generated__/useCreateConsignmentInquiryMutation.graphql"
import { Form, Formik } from "formik"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

const logger = createLogger("ConsignmentInquiry/ConsignmentInquiry.tsx")

const getContactInformationFormInitialValues = (
  me: ConsignmentInquiry_me$data,
): ConsignmentInquiryFormModel => {
  const userRegionCode = me?.phoneNumber?.regionCode ?? ""
  const countryCode = COUNTRY_CODES[userRegionCode.toLocaleUpperCase()]
  let phoneNumber = me?.phone ?? ""

  if (countryCode) {
    phoneNumber = phoneNumber.replace(`+${countryCode}`, "")
  }
  return {
    name: me?.name || "",
    email: me?.email || "",
    phoneNumber,
    phoneNumberCountryCode: me?.phoneNumber?.regionCode || "us",
    message: "",
  }
}

export interface ConsignmentInquiryProps {
  me: ConsignmentInquiry_me$data
  viewer: ConsignmentInquiry_viewer$data
}

export const ConsignmentInquiry: React.FC<
  React.PropsWithChildren<ConsignmentInquiryProps>
> = ({ me, viewer }) => {
  const [showExitModal, setShowExitModal] = useState(false)
  const { trackEvent } = useTracking()
  const { router, match } = useRouter()
  const { sendToast } = useToasts()
  const { submitMutation: createConsignmentInquiry } =
    useCreateConsignmentInquiry()

  const initialValue = getContactInformationFormInitialValues(me)
  const initialErrors = validateContactInformationValidationSchema(
    initialValue,
    consignmentInquiryValidationSchema,
  )

  const recipientEmail = match.params.recipientEmail ?? null

  const recipientName =
    viewer?.staticContent?.specialistBios?.find(i => i.email === recipientEmail)
      ?.firstName ?? null

  const handleSubmit = async ({
    name,
    email,
    phoneNumber,
    phoneNumberCountryCode,
    message,
  }: ConsignmentInquiryFormModel) => {
    if (!(await recaptcha("consignment_inquiry"))) {
      return
    }

    let phoneNumberInternational: string | undefined = undefined
    if (phoneNumber.trim().length) {
      phoneNumberInternational = `+${
        COUNTRY_CODES[phoneNumberCountryCode.toLocaleUpperCase()]
      } ${phoneNumber.trim()}`
    }

    const input: CreateConsignmentInquiryMutationInput = !!recipientEmail
      ? {
          email,
          message,
          name,
          phoneNumber: phoneNumberInternational,
          userId: me?.internalID,
          recipientEmail,
        }
      : {
          email,
          message,
          name,
          phoneNumber: phoneNumberInternational,
          userId: me?.internalID,
        }

    try {
      const response = await createConsignmentInquiry({
        variables: { input },
        rejectIf: res => {
          return res?.createConsignmentInquiry?.consignmentInquiryOrError
            ?.mutationError
        },
      })

      const consignmentInquiryId =
        response.createConsignmentInquiry?.consignmentInquiryOrError
          ?.consignmentInquiry?.internalID

      if (consignmentInquiryId) {
        trackEvent(tracks.sentConsignmentInquiry(consignmentInquiryId))
        router.replace({ pathname: "/sell" })

        router.push(
          !!recipientEmail
            ? `/sell/inquiry/${recipientEmail}/sent`
            : "/sell/inquiry/sent",
        )
      }
    } catch (error) {
      logger.error(error)
      if (typeof error === "string") {
        sendToast({
          variant: "error",
          message: `Error: ${error}`,
          description: "Please contact sell@artsy.net",
        })
        return
      }
      const mutationErrorMessage = error.message ?? error.error
      let otherErrorMessage = ""
      if (Array.isArray(error)) {
        otherErrorMessage = error.reduce((p, c) => {
          if (typeof c === "string") {
            return p + c
          }
          return p + c.message || p.error || ""
        }, "")
      }
      const errorMessage = mutationErrorMessage || otherErrorMessage
      sendToast({
        variant: "error",
        message: `Error${errorMessage ? ":" : ""} ${
          errorMessage ? errorMessage : ""
        }`,
        description: "Please contact sell@artsy.net",
      })
    }
  }

  const handleBack = (isDirty: boolean) => {
    if (isDirty) {
      setShowExitModal(true)
      return
    }
    router.go(-1)
  }

  const handleCloseModal = () => {
    // Every time the modal shows up, we need to decrement by -1, else
    // router needs to pop as many times as the number of times the modal
    // shows up in order to correctly pop to the sell with artsy screen.
    router.go(-1)
    setShowExitModal(false)
  }

  return (
    <>
      <Formik<ConsignmentInquiryFormModel>
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={consignmentInquiryValidationSchema}
        initialErrors={initialErrors}
        initialTouched={{}}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <>
            {showExitModal && (
              <ConsignmentInquiryFormAbandonEditModal
                onClose={handleCloseModal}
              />
            )}

            <TopContextBar
              displayBackArrow
              hideSeparator
              onClick={() => {
                handleBack(dirty)
              }}
            >
              Back
            </TopContextBar>
            <Text mt={4} variant="lg-display">
              {"Contact "}
              {`${recipientName || "a specialist"}`}
            </Text>
            <Spacer y={4} />
            <Form>
              <ConsignmentInquiryForm />
              <Spacer y={4} />
              <Text color="black60" mb="1">
                By continuing, you agree to{" "}
                <RouterLink
                  inline
                  to="https://www.artsy.net/privacy"
                  target="_blank"
                >
                  Privacy Policy
                </RouterLink>
              </Text>
              <Button
                data-testid="consignment-inquiry-send-button"
                width={["100%", "20%"]}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                type="submit"
              >
                Send
              </Button>
              <Spacer y={4} />
            </Form>
          </>
        )}
      </Formik>
    </>
  )
}

export const ConsignmentInquiryFragmentContainer = createFragmentContainer(
  ConsignmentInquiry,
  {
    me: graphql`
      fragment ConsignmentInquiry_me on Me {
        internalID
        name
        email
        phone
        phoneNumber {
          regionCode
        }
      }
    `,
    viewer: graphql`
      fragment ConsignmentInquiry_viewer on Viewer {
        staticContent {
          specialistBios {
            firstName
            email
          }
        }
      }
    `,
  },
)

const tracks = {
  sentConsignmentInquiry: (
    consignmentInquiryId: number,
  ): SentConsignmentInquiry => ({
    action: ActionType.sentConsignmentInquiry,
    context_module: ContextModule.consignmentInquiryForm,
    context_screen_owner_type: OwnerType.consignmentInquiry,
    context_screen: OwnerType.consignmentInquiry,
    consignment_inquiry_id: consignmentInquiryId,
  }),
}
