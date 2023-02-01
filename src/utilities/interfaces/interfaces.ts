
export type CustomerDataType = {
  surname: string,
  firstName: string,
  otherNames: string,
  gender: string,
  dob: string,
  nationality: string,
  soo: string,
  idType: string,
  id: number,
  residentialAddress: string,
  country: string,
  state: string,
  city_town: string,
  lga: string,
  mobileNumber: number,
  status: number,
  statusDescription: string,
  generatedId: number | string
}
export interface BulkCreationData {
  data: {
    customerData: Array<CustomerDataType>,
    requestData: {
      initiator: string,
      initiatorId: string,
      requestType: string,
    }
  }
}

export const BulkCreationDataInitialData = {
  data: {
    customerData: [],
    requestData: {
      initiator: '',
      initiatorId: '',
      requestType: '',
    }
  }
}