import React, { useCallback, useState, useEffect } from 'react'
import { dots, info, NavigationIcon } from 'Assets/svgs'
import { EditIcon } from 'Assets/svgs/EditIcon'
import { Button } from 'Components/Button'
import GoBack from 'Components/MainScreenLayout/GoBack'
import { ProductFrame } from 'Components/ProductFrame'
import AlertModal from 'Components/Shareables/AlertModal'
import { useDispatch, useSelector } from 'react-redux'
import { ProductCategoriesTypes, SaveGPOTypes } from 'Redux/reducers/ProductCategories'
import { ReducersType } from 'Redux/store'
import { gpoData } from 'Utilities/data'
import { productDataType } from 'Utilities/interfaces'
import { getProductCategories, saveGPO } from 'Redux/actions/ProductCategories'
import { UserProfileTypes } from 'Redux/reducers/UserPersmissions'
import { updateGPOSavedState } from 'Redux/actions/ProductCategories/ProductCategories'

const breadCrumbsList = [{
  text: 'CONFIGURATION ENGINE',
  link: '/config',
},
{
  text: 'GLOBAL PRODUCT ORGANIZATION',
  link: '/form',
}]
interface Props {

}

export const Main = ({ }: Props) => {
  const dispatch: any = useDispatch()

  const {
    error: productCategoriesError,
    success: productCategoriesSuccess,
    loading: productCategoriesLoading,
    productCategories: productCategoriesData,
  } = useSelector<ReducersType>((state) => state?.productData) as ProductCategoriesTypes
  const {
    error: userProfileError,
    user: userProfileData,
    loading: userProfileLoading,
    message: userProfileMessage,
    success: userProfileSuccess
  } = useSelector<ReducersType>((state) => state.userProfile) as UserProfileTypes
  const {
    error: saveGPOError,
    loading: saveGPOLoading,
    message: saveGPOMessage,
    success: saveGPOSuccess,
    saved: saveGPOSaved,
  } = useSelector<ReducersType>((state) => state.saveGPO) as SaveGPOTypes
  // {
  // "product_type_id": "aa882402-c335-4043-9274-710583fca759",
  // "data": {	
  //   "name": "Stocks",
  //   "product_category_id": "56137bab-fecc-423b-abf8-0b8a32d93621",
  //   "product_category": "Investment",
  //   "description": "changed stocks category",
  //   "recently_updated_column": "product_category"
  // }
  // }
  // "last_modified_by_id": userProfileData?.id,
  const dataTosaveInitialState = {
    "productTypes": [
    ],
    "last_modified_by": `${userProfileData?.firstname} ${userProfileData?.lastname}`,
    "last_modified_by_id": "b5fee30d-b6dc-457e-850e-d60a3c9ff8c5",
  }
  const [productData, setProductData] = useState([])
  const [dataToSave, setDataToSave] = useState(dataTosaveInitialState)
  const [productDataIndex, setProductDataIndex] = useState(null)
  const [isEdited, setIsEdited] = useState(false)
  const [saveModalLoading, setSaveModalLoading] = useState(false)

  const allowDrop = useCallback((ev: any, index: number) => {
    ev.preventDefault()
    setProductDataIndex(index)
    // setDragOver(true)
  }, [productDataIndex])

  const onSaveGPO = useCallback(() => {
    console.log(dataToSave)
    setSaveModalLoading(true)
    dispatch(saveGPO(dataToSave))
    // setDragOver(true)
  }, [dataToSave, saveModalLoading])

  const dragLeave = useCallback((ev: any) => {
    ev.preventDefault()
    // setDragOver(false)
  }, [])
  const onDiscardChanges = useCallback(() => {
    const resetData = JSON.parse(localStorage.getItem("productCategoriesBackup"))
    setProductData(() => [...resetData])
    // setDragOver(false)
    localStorage.setItem("productCategoryProccess", JSON.stringify({ edited: false }))
  }, [productData, productCategoriesData])
  // Open And Close Modals 
  const closeSaveGPOModal = useCallback(() => {
    setSaveModalLoading(false)
  }, [saveModalLoading])

  const drop = useCallback(
    (ev: any, passedId?: string) => {
      ev.preventDefault()


      let productTypeId: string = passedId ? passedId : ev.dataTransfer.getData("productId");
      console.log(productTypeId)
      const tempProductData = productData
      const targetProductData = productData[productDataIndex]
      const tempSourceProductData = productData.find((data) => {
        const found = data.product_types.find((product) => {
          if (productTypeId === product.product_type_id) {
            return product
          }
        })
        if (found) {
          return data
        }
      })
      const tempSourceProductDataIndex = tempProductData.findIndex((tempProduct) => tempProduct.product_category_id === tempSourceProductData.product_category_id)
      const targetProduct = tempSourceProductData.product_types.find((product) => product.product_type_id === productTypeId)
      const targetProductIndex = tempSourceProductData.product_types.findIndex((product) => product.product_type_id === productTypeId)
      targetProduct.product_category_id = targetProductData.product_category_id

      targetProductData.product_types.push(targetProduct)
      tempSourceProductData.product_types.splice(targetProductIndex, 1)
      tempProductData.splice(productDataIndex, 1, targetProductData)
      tempProductData.splice(tempSourceProductDataIndex, 1, tempSourceProductData)

      const dataToSaveCopy = dataToSave
      const foundProductTypeIndex = dataToSaveCopy.productTypes.findIndex((productType) => productType.product_type_id === productTypeId)
      if (foundProductTypeIndex > -1) {
        const productTypeCopy = dataToSaveCopy.productTypes[foundProductTypeIndex]
        // productTypeCopy.product_type_id = productTypeId

        productTypeCopy.data.product_category_id = targetProductData.product_category_id
        productTypeCopy.data.product_category = targetProductData.product_category
        productTypeCopy.data.description = targetProductData.description
        productTypeCopy.data.recently_updated_column = "product_category_id"

        dataToSaveCopy.productTypes.splice(foundProductTypeIndex, 1, productTypeCopy)

      } else {
        dataToSaveCopy.productTypes.push({
          product_type_id: productTypeId,
          data: {
            product_category_id: targetProductData.product_category_id,
            product_category: targetProductData.product_category,
            description: targetProductData.description,
            recently_updated_column: "product_category_id"
          }
        })
      }
      setDataToSave(() => ({ ...dataToSaveCopy }))
      setProductData(() => [...tempProductData])
      // console.log(tempSourceProductData)
      // console.log(targetProductData)
      localStorage.setItem("productCategoryProccess", JSON.stringify({ edited: true }))
    }, [productData, productDataIndex, dataToSave])

  const updateProductTypeName = useCallback((productDataIndex: number, productTypeId: string, productTypeIndex: number, productTypeName: string) => {
    const tempProductData = productData
    const targetProductData = productData[productDataIndex]
    // const tempSourceProductData = targetProductData.find((data) => {
    const targetProductType = targetProductData.product_types.find((product) => {
      if (productTypeId === product.product_type_id) {
        return product
      }
    })
    targetProductType.name = productTypeName
    targetProductData.product_types.splice(productTypeIndex, 1, targetProductType)
    tempProductData.splice(productDataIndex, 1, targetProductData)


    const dataToSaveCopy = dataToSave
    const foundProductTypeIndex = dataToSaveCopy.productTypes.findIndex((productType) => productType.product_type_id === productTypeId)
    if (foundProductTypeIndex > -1) {
      console.log('exists')
      const productTypeCopy = dataToSaveCopy.productTypes[foundProductTypeIndex]
      // productTypeCopy.product_type_id = productTypeId
      productTypeCopy.data.name = productTypeName
      productTypeCopy.data.product_category_id = targetProductData.product_category_id
      productTypeCopy.data.product_category = targetProductData.product_category
      productTypeCopy.data.description = targetProductData.description
      productTypeCopy.data.recently_updated_column = "name"

      dataToSaveCopy.productTypes.splice(foundProductTypeIndex, 1, productTypeCopy)

    } else {
      console.log('does not exists')
      dataToSaveCopy.productTypes.push({
        product_type_id: productTypeId,
        data: {
          name: productTypeName,
          product_category_id: targetProductData.product_category_id,
          product_category: targetProductData.product_category,
          description: targetProductData.description,
          recently_updated_column: "name"
        }
      })
    }
    setDataToSave(() => ({ ...dataToSaveCopy }))
    setProductData(() => [...tempProductData])
    localStorage.setItem("productCategoryProccess", JSON.stringify({ edited: true }))
  }, [productData, dataToSave])

  useEffect(() => {
    if (!productData.length || saveGPOSaved) {
      dispatch(getProductCategories())
      if (saveGPOSaved) {
        localStorage.setItem("productCategoryProccess", JSON.stringify({ edited: false }))
        dispatch(updateGPOSavedState(false))
      }
    } else {
      const productCategoriesProccess = localStorage.getItem("productCategoryProccess") ? JSON.parse(localStorage.getItem("productCategoryProccess")) : { edited: false }
      setIsEdited(productCategoriesProccess.edited)
    }
  }, [productData, saveGPOSaved])


  useEffect(() => {
    const newData = productCategoriesData.map((data) => ({ ...data }))
    localStorage.setItem("productCategoriesBackup", JSON.stringify(newData))
    setProductData(() => [...newData])
  }, [productCategoriesData])

  return (
    <>
      <nav><GoBack headerText={`GLOBAL PRODUCT ORGANIZATION`} breadCrumbsList={[...breadCrumbsList]} /></nav>

      <main className={`relative flex py-[1.25rem] px-8 gap-x-[1.25rem] h-screen w-full text-[1rem] bg-[#E5E9EB] leading-4 text-[#636363] font-Inter justify-center`}>
        <section className={`relative w-full`}>
          <div className={` relative flex rounded-lg text-[#636363] font-[Inter] w-full h-full  min:h-full max:h-full overflow-y-auto bg-white pb-10 pt-20`}>

            <div className={`w-full mb-10 mx-10`}>

              <div className={`w-full text-center flex justify-center items-center px-2 gap-2`}>
                <img src={info} />
                Drag and drop products across the verticals to rearrange products
              </div>
              <div className={`grow w-full flex justify-center items-center mt-5`}>
                <div className={`relative  grid md:grid-cols-[24rem_24rem] grid-cols-[100%] justify-center items-center gap-12 w-[70%] h-full`}>
                  <div className={`absolute justify-center items-center w-fit h-fit left-0 right-0 top-0 bottom-0 m-auto hidden md:flex`}>

                    <NavigationIcon />
                  </div>
                  <>
                    {
                      productData.map((data, index) => (
                        <ProductFrame key={data?.product_category_id} data={data} allowDrop={allowDrop} dragLeave={dragLeave} drop={drop} productIndex={index} updateProductTypeName={updateProductTypeName} />
                      ))
                    }
                  </>
                </div>
              </div>

              <div className={`flex justify-center gap-x-5 mt-10`}>
                <Button
                  className={`bg-transparent border border-[#AAAAAA] text-[#636363_!important] w-fit disabled:text-white`}
                  onClick={onDiscardChanges} disabled={!isEdited}        // disabled={false}
                ><span className={`hover:text-white`}>
                    Discard Changes
                  </span>

                </Button>
                <Button
                  className={`bg-primay-main text-[white_!important] `}
                  onClick={onSaveGPO} disabled={!isEdited}        // disabled={false}
                >
                  Save
                </Button>

              </div>
            </div>
          </div>
        </section>
        <AlertModal isOpen={productCategoriesLoading} closeModal={undefined} loading={productCategoriesLoading} loadingMessage={`Fetching`} />
        <AlertModal
          isOpen={saveModalLoading}
          loading={saveGPOLoading}
          closeModal={closeSaveGPOModal}
          status={saveGPOSuccess ? `success` : saveGPOError ? 'error' : "warning"}
          loadingMessage={`Saving`}
          message={saveGPOMessage}
        />
      </main>
    </>
  )
}
