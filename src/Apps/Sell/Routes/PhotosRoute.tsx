import * as React from "react"
import { PhotosRoute_submission$key } from "__generated__/PhotosRoute_submission.graphql"
import { Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import * as Yup from "yup"
import { Formik } from "formik"
import { DevDebug } from "Apps/Sell/Components/DevDebug"
import { SubmissionLayout } from "Apps/Sell/Components/SubmissionLayout"

const FRAGMENT = graphql`
  fragment PhotosRoute_submission on ConsignmentSubmission {
    assets {
      id
      imageUrls
    }
  }
`

const Schema = Yup.object().shape({
  assets: Yup.array(),
  // .min(1)
  // .transform(fields => fields.filter(c => !c.errorMessage))
  // .of(Yup.object().test("photos", value => value.assetId)),
})

interface Asset {
  id?: string
  imageUrls: string[]
}

interface FormValues {
  assets: Asset[]
}

interface PhotosRouteProps {
  submission: PhotosRoute_submission$key
}

export const PhotosRoute: React.FC<PhotosRouteProps> = props => {
  const submission = useFragment(FRAGMENT, props.submission)

  const onSubmit = async (values: FormValues) => {
    // TODO: Update photos
  }

  const initialValues: FormValues = {
    assets: (submission.assets as Asset[]) ?? [],
  }

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validateOnMount
      validationSchema={Schema}
    >
      <SubmissionLayout>
        <Text mb={2} variant="xl">
          Upload photos of your artwork
        </Text>
        <Text mb={2} variant="sm">
          Make your work stand out and get your submission evaluated faster by
          uploading high-quality photos of the work's front and back.
        </Text>
        <DevDebug />
      </SubmissionLayout>
    </Formik>
  )
}
