import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateSettingsInformationMutation } from "__generated__/useUpdateSettingsInformationMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateSettingsInformation = () => {
  return useMutation<useUpdateSettingsInformationMutation>({
    mutation: graphql`
      mutation useUpdateSettingsInformationMutation(
        $input: UpdateMyProfileInput!
      ) {
        updateMyUserProfile(input: $input) {
          me {
            ...SettingsEditSettingsInformation_me
            email
            name
            phoneNumber {
              regionCode
              display(format: NATIONAL)
              originalNumber
            }
            priceRangeMin
            priceRangeMax
          }
          userOrError {
            ... on UpdateMyProfileMutationSuccess {
              user {
                internalID
              }
            }
            ... on UpdateMyProfileMutationFailure {
              mutationError {
                type
                message
                detail
                error
                fieldErrors {
                  name
                  message
                }
              }
            }
          }
        }
      }
    `,
  })
}
