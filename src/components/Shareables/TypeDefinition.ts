export type UploadFile = {
  file: File
  key?: string
  verificationData?: {
    docType: string
    extractedData: string[]
  }
}
