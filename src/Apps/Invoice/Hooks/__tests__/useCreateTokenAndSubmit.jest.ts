/* eslint-disable react-hooks/rules-of-hooks */
import { renderHook } from "@testing-library/react-hooks"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useMakeInvoicePayment } from "Apps/Invoice/Hooks/useMakeInvoicePayment"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import {
  useCreateTokenAndSubmit,
  UseCreateTokenAndSubmitProps,
} from "Apps/Invoice/Hooks/useCreateTokenAndSubmit"

jest.mock("Components/Address/AddressForm", () => ({
  toStripeAddress: jest.fn(),
}))

jest.mock("Apps/Invoice/Hooks/useMakeInvoicePayment")

jest.mock("@stripe/react-stripe-js", () => ({
  useStripe: jest.fn(),
  useElements: jest.fn(),
  CardElement: jest.fn(),
}))

describe("useCreateTokenAndSubmit", () => {
  const mockUseElements = useElements as jest.Mock
  const mockUseStripe = useStripe as jest.Mock
  const mockUseMakeInvoicePayment = useMakeInvoicePayment as jest.Mock

  const helpers = {
    setFieldError: jest.fn(),
    setStatus: jest.fn(),
    setSubmitting: jest.fn(),
  }

  const props: UseCreateTokenAndSubmitProps = {
    invoiceID: "invoice-id",
    amountMinor: 10000,
    invoiceToken: "invoice-token",
    onSuccess: jest.fn(),
  }

  const setupHook = async () => {
    const { result } = renderHook(() => useCreateTokenAndSubmit(props))

    if (result.error) {
      throw result.error
    }

    const createToken = result.current.createToken as any

    try {
      await createToken({}, helpers)
    } catch (error) {
      throw new Error(error)
    }
  }

  beforeEach(() => {
    mockUseStripe.mockImplementation(() => ({
      createToken: jest.fn(() => ({
        error: null,
        token: {
          id: "tokenID",
        },
      })),
    }))

    mockUseElements.mockImplementation(() => ({
      getElement: jest.fn(() => "foo"),
    }))

    mockUseMakeInvoicePayment.mockImplementation(() => ({
      submitMutation: jest.fn(),
    }))
  })

  describe("tokenizing the credit card and making an invoice payment", () => {
    it("makes a payment with the right arguments", async () => {
      const spy = jest.fn()
      mockUseMakeInvoicePayment.mockImplementation(() => ({
        submitMutation: spy,
      }))

      await setupHook()

      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              amountMinor: 10000,
              creditCardToken: "tokenID",
              invoiceID: "invoice-id",
              invoiceToken: "invoice-token",
              provider: "stripe",
            },
          },
        })
      )
    })
  })

  it("triggers an onSuccess callback", async () => {
    await setupHook()
    await flushPromiseQueue()
    expect(props.onSuccess).toHaveBeenCalled()
  })
})
