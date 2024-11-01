import { Join, Spacer } from "@artsy/palette"
import { CreditCardInput } from "Components/CreditCardInput"
import { AddressForm } from "./AddressForm"
import { useFormContext } from "Apps/Invoice/Hooks/useFormContext"

export const AddressFormWithCreditCard: React.FC = () => {
  const {
    setFieldValue,
    setFieldTouched,
    setFieldError,
    errors,
    touched,
  } = useFormContext()

  return (
    <Join separator={<Spacer y={2} />}>
      <CreditCardInput
        error={touched.creditCard && errors.creditCard}
        onChange={event => {
          setFieldTouched("creditCard", true)

          if (event.error?.message) {
            setFieldValue("creditCard", false)
            setFieldError("creditCard", event.error?.message)
            return
          }
          if (!event.complete) {
            setFieldValue("creditCard", false)
            return
          }
          if (event.complete) {
            setFieldValue("creditCard", true)
            return
          }
        }}
        required
      />

      <AddressForm />
    </Join>
  )
}
