import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userProfileReducer, UserProfileTypes, userRolesAndPermissionsReducer, UserRolesAndPersmissionsTypes } from 'Redux/reducers/UserPersmissions'
import { ProductCategoriesReducer, ProductCategoriesTypes, SaveGPOReducer, SaveGPOTypes } from './reducers/ProductCategories'


export type ReducersType = {
  userRolesAndPermissions: UserRolesAndPersmissionsTypes
  userProfile: UserProfileTypes
  productData: ProductCategoriesTypes
  saveGPO: SaveGPOTypes
}

const reducer = combineReducers<ReducersType>({
  userRolesAndPermissions: userRolesAndPermissionsReducer,
  userProfile: userProfileReducer,
  productData: ProductCategoriesReducer,
  saveGPO: SaveGPOReducer
})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
