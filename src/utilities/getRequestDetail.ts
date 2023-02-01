const getRequestDetail = (request, field: string): string | string[]  => {
  if (field === 'surname') {
    return request?.data?.customerData.map((detail) => {
      return detail?.data?.surname
    })
  }
  if (field === 'firstName') {
    return request?.data?.customerData.map((detail) => {
      return detail?.data?.firstName
    })
  }
  if(field === 'sectionName'){
    return request?.data?.customerData.map((detail) => {
      return detail?.sectionName
    }) 
  }
}


export default getRequestDetail