import { useMutation } from "Utils/Hooks/useMutation"
import type { useCreateSavedAddressMutation } from "__generated__/useCreateSavedAddressMutation.graphql"
import { graphql } from "react-relay"

export const useCreateSavedAddress = () => {
  return useMutation<useCreateSavedAddressMutation>({
    mutation: graphql`
      mutation useCreateSavedAddressMutation($input: CreateUserAddressInput!) {
        createUserAddress(input: $input) {
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
