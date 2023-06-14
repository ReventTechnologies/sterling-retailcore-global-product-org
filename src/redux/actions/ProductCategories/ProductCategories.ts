// export const baseUrl = "https://product-management-api-dev.reventtechnologies.com"
const ReventBaseUrl = process.env.REVENT_BASE_URL
// const PrunedgeAccountingUrl = process.env.PRUNEDGE_ACCOUNTING_URL
const ENVIRONMENT = process.env.ENVIRONMENT
// /v1/product-category/

// import axios from 'axios'
import axios from 'axios'
import { Dispatch } from 'redux'
import {
  GET_PRODUCT_CATEGORIES_FAILED,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  SAVE_PRODUCT_CATEGORIES_FAILED,
  SAVE_PRODUCT_CATEGORIES_REQUEST,
  SAVE_PRODUCT_CATEGORIES_SUCCESS,
  UPDATE_GPO_SAVED_STATE
} from 'Redux/constants/ProductCategories'

interface ActionTypes {
  GET_PRODUCT_CATEGORIES_FAILED: any
  GET_PRODUCT_CATEGORIES_REQUEST: any
  GET_PRODUCT_CATEGORIES_SUCCESS: any
  SAVE_PRODUCT_CATEGORIES_FAILED: any
  SAVE_PRODUCT_CATEGORIES_REQUEST: any
  SAVE_PRODUCT_CATEGORIES_SUCCESS: any
  UPDATE_GPO_SAVED_STATE: any
}

interface MessageAction {
  type: keyof ActionTypes
  payload: any
}
export type setProductCategoriesActionTypes = MessageAction

export const updateGPOSavedState = (state: boolean) => {
  return {
    type: UPDATE_GPO_SAVED_STATE,
    payload: state
  }
}
export const getProductCategories = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_CATEGORIES_REQUEST,
    })

    const token = localStorage.getItem('@sterling_core_token') ? localStorage.getItem('@sterling_core_token') : null
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        environment: ENVIRONMENT,
      },
    }
    const { data } = await axios.get(`${ReventBaseUrl}/product-category/all/association`, config)
    console.log(data)
    if (data.status === 'success') {
      dispatch({
        type: GET_PRODUCT_CATEGORIES_SUCCESS,
        payload: data?.data
      })
    }

  } catch (error) {
    dispatch({
      type: GET_PRODUCT_CATEGORIES_FAILED,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}

export const saveGPO = (gpoData) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SAVE_PRODUCT_CATEGORIES_REQUEST,
    })

    const token = localStorage.getItem('@sterling_core_token') ? localStorage.getItem('@sterling_core_token') : null
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        environment: ENVIRONMENT,
      },
    }

    const { data } = await axios.patch(`${ReventBaseUrl}/global-product-organization/product-types`, gpoData, config)
    //  console.log(data)
    if (data?.status === 'success') {
      dispatch({
        type: SAVE_PRODUCT_CATEGORIES_SUCCESS,
        payload: "Configuration Sent for Approval"
      })

      // dispatch(updateGPOSavedState(true))
    }
  } catch (error) {
    dispatch({
      type: SAVE_PRODUCT_CATEGORIES_FAILED,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })

    dispatch(updateGPOSavedState(false))
  }
}
