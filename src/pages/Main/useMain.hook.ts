import { getProductCategories, saveGPO } from 'Redux/actions/ProductCategories'
import { getProductAllCategories, updateGPOSavedState } from 'Redux/actions/ProductCategories/ProductCategories'
import { ProductCategoriesTypes, SaveGPOTypes } from 'Redux/reducers/ProductCategories'
import { UserProfileTypes } from 'Redux/reducers/UserPersmissions'
import { ReducersType } from 'Redux/store'
import { CategoryType } from 'Types/CategoryType.type'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useMain() {
  const dataTosaveInitialState = {
    productTypes: [],
  }
  const dispatch: any = useDispatch()
  const [productData, setProductData] = useState([])
  const [dataToSave, setDataToSave] = useState(dataTosaveInitialState)
  const [productDataIndex, setProductDataIndex] = useState(null)
  const [saveModalLoading, setSaveModalLoading] = useState(false)
  const [currentEditId, setCurrentEditId] = useState(null)
  const {
    loading: productCategoriesLoading,
    productCategories: productCategoriesData,
    categoryData,
  } = useSelector<ReducersType>((state) => state?.productData) as ProductCategoriesTypes
  const { user: userProfileData } = useSelector<ReducersType>((state) => state.userProfile) as UserProfileTypes
  const {
    error: saveGPOError,
    loading: saveGPOLoading,
    message: saveGPOMessage,
    success: saveGPOSuccess,
    saved: saveGPOSaved,
  } = useSelector<ReducersType>((state) => state.saveGPO) as SaveGPOTypes

  const breadCrumbsList = [
    {
      text: 'CONFIGURATION ENGINE',
      link: '/config',
    },
    {
      text: 'GLOBAL PRODUCT ORGANIZATION',
      link: '/form',
    },
  ]

  useEffect(() => {
    if (!productData?.length || saveGPOSaved) {
      dispatch(getProductCategories())
      dispatch(getProductAllCategories())
      if (saveGPOSaved) {
        dispatch(updateGPOSavedState(false))
      }
    }
  }, [productData, saveGPOSaved])

  useEffect(() => {
    if (productCategoriesData) {
      const newData = productCategoriesData?.map((data) => ({ ...data }))
      setProductData(() => [...newData])
    }
  }, [productCategoriesData])

  const disabled = (): boolean => {
    return !!currentEditId
  }

  const allowDrop = useCallback(
    (ev: any, index: number) => {
      ev.preventDefault()
      setProductDataIndex(index)
    },
    [productDataIndex]
  )

  const onSaveGPO = useCallback(() => {
    const categoryTypeMap: { [key: string]: CategoryType } = {}
    const newArray: CategoryType[] = Object.values(categoryTypeMap)

    dataToSave.productTypes.forEach((obj) => {
      const categoryId = categoryData?.find((a) => a.product_types.find((b) => b.product_type_id === obj.product_type_id))?.product_category_id
      const categoryType: CategoryType = {
        currentProductCategoryId: categoryId,
        newProductCategoryId: obj.data.product_category_id,
        productTypeId: obj.product_type_id,
      }
      newArray.push(categoryType)
    })

    const newDataToSave = {
      data: newArray,
    }

    setSaveModalLoading(true)
    dispatch(saveGPO(newDataToSave))
    setDataToSave(() => dataTosaveInitialState)
  }, [dataToSave, saveModalLoading])

  const dragLeave = useCallback((ev: any) => {
    ev.preventDefault()
  }, [])

  const onDiscardChanges = useCallback(() => {
    dispatch(getProductCategories())
    dispatch(getProductAllCategories())
  }, [productData, productCategoriesData])

  // Open And Close Modals
  const closeSaveGPOModal = useCallback(() => {
    setSaveModalLoading(false)
  }, [saveModalLoading])

  const drop = useCallback(
    (ev: any, passedId?: string) => {
      ev.preventDefault()

      let productTypeId: string = passedId ? passedId : ev.dataTransfer.getData('productId')
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

      if (targetProductData.product_category_id === tempSourceProductData.product_category_id) {
        return
      }

      const tempSourceProductDataIndex = tempProductData.findIndex(
        (tempProduct) => tempProduct.product_category_id === tempSourceProductData.product_category_id
      )
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
        productTypeCopy.data.recently_updated_column = 'product_category_id'

        dataToSaveCopy.productTypes.splice(foundProductTypeIndex, 1, productTypeCopy)
      } else {
        dataToSaveCopy.productTypes.push({
          product_type_id: productTypeId,
          data: {
            product_category_id: targetProductData.product_category_id,
            product_category: targetProductData.product_category,
            description: targetProductData.description,
            recently_updated_column: 'product_category_id',
          },
        })
      }
      setDataToSave(() => ({ ...dataToSaveCopy }))
      setProductData(() => [...tempProductData])
    },
    [productData, productDataIndex, dataToSave]
  )

  return {
    breadCrumbsList,
    disabled,
    allowDrop,
    onSaveGPO,
    dragLeave,
    onDiscardChanges,
    closeSaveGPOModal,
    drop,
    productData,
    currentEditId,
    setCurrentEditId,
    productCategoriesLoading,
    saveModalLoading,
    saveGPOLoading,
    saveGPOSuccess,
    saveGPOError,
    saveGPOMessage,
    userProfileData,
  }
}
