export enum STORAGE_NAMES {
  PUBLISHED_FORM_IN_STORAGE = 'CUSTOMER_MANAGEMENT-publishedFormInStorage',
  FILLING_FORM_IN_STORAGE = 'CUSTOMER_MANAGEMENT-fillingFormInStorage',
  BACKUP_FOR_SWITCH_FORM_IN_STORAGE = 'CUSTOMER_MANAGEMENT-backupForSwitchFormInStorage',
  FORM_MODE_STATUS = 'CUSTOMER_MANAGEMENT-FORM_MODE_STATUS',
  STOP_FORM_FILLING_STATUS = 'CUSTOMER_MANAGEMENT-stopFormFillingStatus',
  SHOW_WAIVER_MODAL_IN_FORM = 'CUSTOMER_MANAGEMENT-showWaiverModalInForm',
  SIGNATORY_IN_STORAGE = 'CUSTOMER_MANAGEMENT-signatoryInStorage',
  EXECUTIVE_IN_STORAGE = 'CUSTOMER_MANAGEMENT-executiveInStorage',
  ADDITIONAL_DETAILS_IN_STORAGE = 'CUSTOMER_MANAGEMENT-additionalDetailsInStorage',
  SHOW_EDD_MODAL_IN_FORM = 'CUSTOMER-MANAGEMENT-showEddModalInForm',
}

// type StorageType = 'localStorage' | 'sessionStorage'
// export type StorageNameType = 'activeFormSection'
// export type StorageAction = 'getItem' | 'setItem' | 'removeItem' | 'clear'

// export function browserStorage(storageType: StorageType, action: StorageAction, storageName: StorageNameType, itemToStore?: any) {
//   if (!itemToStore && action === 'setItem') {
//     const name = storageName ? storageName : 'browser storage'
//     throw Error(`You cannot set an empty item to ${name}`)
//   }

//   if (itemToStore && action !== 'setItem') {
//     throw Error(`You cannot perform this operation`)
//   }

//   if (action === 'setItem') {
//     const storage = storageType === "localStorage" ? "localStorage" : "sessionStorage"
//     const theAction = action === "setItem" ? ""
//     return [storageType][action](`${storageName}`, JSON.stringify(itemToStore))
//   }

//   if (action === 'removeItem') {
//     return [storageType][action](`${storageName}`)
//   }

//   if (action === 'getItem') {
//     return [storageType][action](`${storageName}`)
//   }

//   if (action === 'clear') {
//     return [storageType][action]()
//   }
// }
