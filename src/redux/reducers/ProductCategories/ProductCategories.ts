import {
  GET_PRODUCT_CATEGORIES_FAILED,
  GET_PRODUCT_CATEGORIES_REQUEST,
  GET_PRODUCT_CATEGORIES_SUCCESS,
  GET_PRODUCT_CATEGORIES_SUCCESSS,
  PRODUCT_TYPE_NAME_FAILED,
  PRODUCT_TYPE_NAME_REQUEST,
  PRODUCT_TYPE_NAME_SUCCESS,
  SAVE_PRODUCT_CATEGORIES_FAILED,
  SAVE_PRODUCT_CATEGORIES_REQUEST,
  SAVE_PRODUCT_CATEGORIES_SUCCESS,
  UPDATE_GPO_SAVED_STATE,
  UPDATE_PRODUCT_TYPE_NAME_SAVED_STATE,
} from 'Redux/constants/ProductCategories'

import { setProductCategoriesActionTypes } from 'Redux/actions/ProductCategories'

const ProductCategoriesInitialState = {
  productCategories: [],
  message: '',
  loading: false,
  success: true,
  error: false,
  categoryData: [],
}

export interface ProductCategoriesTypes {
  productCategories: any[]
  message: string
  loading: boolean
  success: boolean
  error: boolean
  categoryData: any[]
}

const SaveGPOInitialState = {
  message: '',
  loading: false,
  success: true,
  error: false,
  saved: false,
}

export interface SaveGPOTypes {
  message: string
  loading: boolean
  success: boolean
  error: boolean
  saved: boolean
}

export interface SaveProductTypeNameType {
  message: string
  loading: boolean
  success: boolean
  error: boolean
  saved: boolean
}

const SaveProductTypeNameInitialState = {
  message: '',
  loading: false,
  success: true,
  error: false,
  saved: false,
}

export const ProductCategoriesReducer = (state: ProductCategoriesTypes = ProductCategoriesInitialState, action: setProductCategoriesActionTypes) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORIES_REQUEST:
      return { ...state, loading: true, success: false }
    case GET_PRODUCT_CATEGORIES_SUCCESS:
      return { ...state, loading: false, success: true, productCategories: action.payload }
    case GET_PRODUCT_CATEGORIES_SUCCESSS:
      return { ...state, loading: false, success: true, categoryData: action.payload }
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

export const SaveProductTypeNameReducer = (state: SaveProductTypeNameType = SaveProductTypeNameInitialState, action) => {
  switch (action.type) {
    case PRODUCT_TYPE_NAME_REQUEST:
      return { ...state, loading: true, success: false }
    case PRODUCT_TYPE_NAME_SUCCESS:
      return { ...state, loading: false, success: true, saved: true, message: action.payload }
    case PRODUCT_TYPE_NAME_FAILED:
      return { ...state, loading: false, success: false, error: true, message: action.payload }
    case UPDATE_PRODUCT_TYPE_NAME_SAVED_STATE:
      return { ...state, saved: action.payload }
    default:
      return state
  }
}