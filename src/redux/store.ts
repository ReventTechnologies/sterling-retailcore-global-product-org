import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { userProfileReducer, UserProfileTypes, userRolesAndPermissionsReducer, UserRolesAndPersmissionsTypes } from 'Redux/reducers/UserPersmissions'


export type ReducersType = {
  userRolesAndPermissions: UserRolesAndPersmissionsTypes
  userProfile: UserProfileTypes

}

const reducer = combineReducers<ReducersType>({
  userRolesAndPermissions: userRolesAndPermissionsReducer,
  userProfile: userProfileReducer,

})

const middleware = [thunk]

const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
