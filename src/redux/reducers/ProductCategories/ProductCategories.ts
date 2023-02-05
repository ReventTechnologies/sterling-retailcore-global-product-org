import {
  GET_PRODUCT_CATEGORIES_FAILED,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  SAVE_PRODUCT_CATEGORIES_FAILED,
  SAVE_PRODUCT_CATEGORIES_REQUEST,
  SAVE_PRODUCT_CATEGORIES_SUCCESS,
  UPDATE_GPO_SAVED_STATE
} from 'Redux/constants/ProductCategories'

import {
  setProductCategoriesActionTypes,
} from 'Redux/actions/ProductCategories'


const ProductCategoriesInitialState = {
  productCategories: [],
  message: '',
  loading: false,
  success: true,
  error: false,
}

export interface ProductCategoriesTypes {
  productCategories: any[],
  message: string,
  loading: boolean,
  success: boolean,
  error: boolean,
}


const SaveGPOInitialState = {
  message: '',
  loading: false,
  success: true,
  error: false,
  saved: false,
}

export interface SaveGPOTypes {
  message: string,
  loading: boolean,
  success: boolean,
  error: boolean,
  saved: boolean
}


export const ProductCategoriesReducer = (state: ProductCategoriesTypes = ProductCategoriesInitialState, action: setProductCategoriesActionTypes) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES_REQUEST:
      return { ...state, loading: true, success: false }
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return { ...state, loading: false, success: true, productCategories: action.payload }
    case GET_PRODUCT_CATEGORIES_FAILED:
      return { ...state, loading: false, success: false, error: true, message: action.payload }
    default:
      return state
  }
}


export const SaveGPOReducer = (state: SaveGPOTypes = SaveGPOInitialState, action: setProductCategoriesActionTypes) => {
  switch (action.type) {
    case SAVE_PRODUCT_CATEGORIES_REQUEST:
      return { ...state, loading: true, success: false }
    case SAVE_PRODUCT_CATEGORIES_SUCCESS:
      return { ...state, loading: false, success: true, saved: true, message: action.payload }
    case SAVE_PRODUCT_CATEGORIES_FAILED:
      return { ...state, loading: false, success: false, error: true, message: action.payload }
    case UPDATE_GPO_SAVED_STATE:
      return { ...state, saved: action.payload }
    default:
      return state
  }
}
