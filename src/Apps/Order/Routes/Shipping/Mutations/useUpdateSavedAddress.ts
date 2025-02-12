import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateSavedAddressMutation } from "__generated__/useUpdateSavedAddressMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateSavedAddress = () => {
  return useMutation<useUpdateSavedAddressMutation>({
    mutation: graphql`
      mutation useUpdateSavedAddressMutation($input: UpdateUserAddressInput!) {
        updateUserAddress(input: $input) {
          me {
            ...Shipping_me
          }
          userAddressOrErrors {
            __typename
            ... on Errors {
              errors {
                message
              }
            }
            ... on UserAddress {
              id
              internalID
              addressLine1
              addressLine2
              addressLine3
              city
              country
              isDefault
              name
              phoneNumber
              postalCode
              region
            }
          }
        }
      }
    `,
  })
}
