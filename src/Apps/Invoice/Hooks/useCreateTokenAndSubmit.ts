import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import createLogger from "Utils/logger"
import { toStripeAddress } from "Components/Address/AddressForm"
import {
  stripeCardElementNotFound,
  stripeNotLoadedErrorMessage,
} from "Apps/Auction/Components/Form/Utils/errorMessages"
import { FormikHelpers } from "formik"
import { AddressFormValues } from "Apps/Invoice/Components/AddressForm"
import { useMakeInvoicePayment } from "Apps/Invoice/Hooks/useMakeInvoicePayment"
import { InvoicePaymentFormProps } from "Apps/Invoice/Components/InvoicePaymentForm"
import { useToasts } from "@artsy/palette"

const logger = createLogger("useCreateTokenAndSubmit")

export interface UseCreateTokenAndSubmitProps extends InvoicePaymentFormProps {
  onSuccess: () => void
}

export const useCreateTokenAndSubmit = ({
  onSuccess,
  ...rest
}: UseCreateTokenAndSubmitProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const { sendToast } = useToasts()

  const { submitMutation: makeInvoicePaymentMutation } = useMakeInvoicePayment()

  const createToken = async (
    values: AddressFormValues,
    helpers: FormikHelpers<AddressFormValues>
  ) => {
    if (!stripe || !elements) {
      logger.error(stripeNotLoadedErrorMessage)
      helpers.setStatus("SUBMISSION_FAILED")
      return
    }

    const cardNumberElement = elements.getElement(CardNumberElement)
    const cardExpiryElement = elements.getElement(CardExpiryElement)
    const cardCvcElement = elements.getElement(CardCvcElement)

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      logger.error(stripeCardElementNotFound)
      helpers.setStatus("SUBMISSION_FAILED")
      return
    }

    helpers.setSubmitting(true)

    try {
      const { error, token } = await stripe.createToken(
        cardNumberElement,
        toStripeAddress(values.address)
      )

      if (error) {
        helpers.setFieldError("creditCard", error.message)
        return
      }

      await makeInvoicePaymentMutation({
        variables: {
          input: {
            creditCardToken: token.id,
            provider: "stripe",
            ...rest,
          },
        },
        rejectIf: res => {
          if (res.createInvoicePayment?.responseOrError?.mutationError) {
            const errorMessage =
              res.createInvoicePayment.responseOrError.mutationError.message

            helpers.setFieldError("creditCard", errorMessage)

            return errorMessage
          }
        },
      })

      sendToast({
        variant: "success",
        message: "Payment successful",
      })

      onSuccess()
    } catch (error) {
      helpers.setStatus("SUBMISSION_FAILED")
    } finally {
      helpers.setSubmitting(false)
    }
  }

  return {
    createToken,
  }
}
