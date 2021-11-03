import { Environment } from "relay-runtime"
import {
  getConvectionGeminiKey,
  getGeminiCredentialsForEnvironment,
} from "../../Mutations"
import { Photo, uploadPhoto } from "../fileUtils"
import { uploadFileToS3 } from "../uploadFileToS3"

jest.mock("../../Mutations/Gemini/getConvectionGeminiKey", () => ({
  ...jest.requireActual("../../Mutations/Gemini/getConvectionGeminiKey"),
  getConvectionGeminiKey: jest.fn().mockResolvedValue("convectionKey"),
}))

jest.mock("../../Mutations/Gemini/getGeminiCredentialsForEnvironment", () => ({
  ...jest.requireActual(
    "../../Mutations/Gemini/getGeminiCredentialsForEnvironment"
  ),
  getGeminiCredentialsForEnvironment: jest.fn(),
}))

jest.mock("../uploadFileToS3", () => ({
  ...jest.requireActual("../uploadFileToS3"),
  uploadFileToS3: jest.fn().mockResolvedValue("key"),
}))

describe("fileUtils", () => {
  describe("uploadPhoto", () => {
    let relayEnvironment = {} as Environment
    let photo: Photo
    let updateProgress = jest.fn()

    beforeEach(() => {
      ;(getGeminiCredentialsForEnvironment as jest.Mock).mockClear()
      ;(getConvectionGeminiKey as jest.Mock).mockClear()
      ;(uploadFileToS3 as jest.Mock).mockClear()

      photo = {
        removed: false,
      } as Photo
    })

    it("use convectionKey to get gemini credentials", async () => {
      await uploadPhoto(relayEnvironment, photo, updateProgress)

      expect(getConvectionGeminiKey).toHaveBeenCalled()
      expect(getGeminiCredentialsForEnvironment).toHaveBeenCalled()
      expect(getGeminiCredentialsForEnvironment).toHaveBeenCalledWith(
        relayEnvironment,
        {
          acl: "private",
          name: "convectionKey",
        }
      )
    })

    it("use assetCredentials to upload file to S3", async () => {
      const assetCredentials = {}
      ;(getGeminiCredentialsForEnvironment as jest.Mock).mockResolvedValue(
        assetCredentials
      )

      await uploadPhoto(relayEnvironment, photo, updateProgress)

      expect(getGeminiCredentialsForEnvironment).toHaveBeenCalled()
      expect(uploadFileToS3).toHaveBeenCalled()
      expect(uploadFileToS3).toHaveBeenCalledWith(
        photo,
        "private",
        assetCredentials,
        updateProgress
      )
    })

    it("prevents uploading if the image was removed", async () => {
      photo.removed = true

      await uploadPhoto(relayEnvironment, photo, updateProgress)

      expect(uploadFileToS3).not.toHaveBeenCalled()
    })
  })
})