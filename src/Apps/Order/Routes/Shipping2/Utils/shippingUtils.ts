import { AddressVerifiedBy } from "Apps/Order/Components/AddressVerificationFlow"
import { ShippingProps } from "Apps/Order/Routes/Shipping2"
import { pick, omitBy, isNil } from "lodash"

export enum FulfillmentType {
  SHIP = "SHIP",
  PICKUP = "PICKUP",
}

export interface PickupValues {
  fulfillmentType: FulfillmentType.PICKUP
  attributes: {
    name: string
    phoneNumber: string
  }
}

export interface ShipValues {
  fulfillmentType: FulfillmentType.SHIP
  attributes: ShippingAddressFormValues & {
    saveAddress: boolean
    addressVerifiedBy: AddressVerifiedBy | null
  }
}

export type FulfillmentValues = ShipValues | PickupValues

export interface ShippingAddressFormValues {
  name: string
  phoneNumber: string
  addressLine1: string
  addressLine2?: string
  city: string
  region: string
  country: string
  postalCode: string
}

const ORDER_EMPTY_ADDRESS: ShippingAddressFormValues = {
  name: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  country: "",
  postalCode: "",
}

export const onlyAddressValues = (values: any) => {
  return pick<ShippingAddressFormValues>(
    values,
    Object.keys(ORDER_EMPTY_ADDRESS)
  )
}

export const addressWithFallbackValues = (
  address: any
): ShippingAddressFormValues => ({
  ...ORDER_EMPTY_ADDRESS,
  ...omitBy<ShippingAddressFormValues>(onlyAddressValues(address), isNil),
})

export type SavedAddressType = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<ShippingProps["me"]["addressConnection"]>["edges"]
    >[number]
  >["node"]
>

// Get the user's default address, optionally filtering by a list of countries.
export const getDefaultUserAddress = (
  savedAddresses: SavedAddressType[],
  filterCountries?: string[]
) => {
  const shippableAddresses = savedAddresses.filter(node => {
    if (!Boolean(node)) return false
    if (!filterCountries) return true
    return filterCountries.includes(node.country)
  })
  return (
    shippableAddresses.find(node => node.isDefault) || shippableAddresses[0]
  )
}

export const matchAddressFields = (...addressPair: [object, object]) => {
  const [a1, a2] = addressPair.map(a => addressWithFallbackValues(a))
  return (
    a1.addressLine1 === a2.addressLine1 &&
    a1.addressLine2 === a2.addressLine2 &&
    a1.city === a2.city &&
    a1.country === a2.country &&
    a1.name === a2.name &&
    a1.phoneNumber === a2.phoneNumber &&
    a1.postalCode === a2.postalCode &&
    a1.region === a2.region
  )
}