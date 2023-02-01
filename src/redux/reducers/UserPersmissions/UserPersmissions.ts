import {
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_ROLE_AND_PERMISSIONS_FAILED,
  GET_USER_ROLE_AND_PERMISSIONS_REQUEST,
  GET_USER_ROLE_AND_PERMISSIONS_SUCCESS
} from 'Redux/constants/UserPersmissions'

import {
  setRolesAndPermissionsActionTypes
} from 'Redux/actions/UserPersmissions'


const UserRolesAndPersmissionsInitialState = {
  roles: [],
  message: '',
  loading: false,
  success: true,
  error: false,
}

export interface UserRolesAndPersmissionsTypes {
  roles: any[],
  message: string,
  loading: boolean,
  success: boolean,
  error: boolean,
}


const UserProfileInitialState = {
  user: {},
  message: '',
  loading: false,
  success: true,
  error: false,
}

export interface UserProfileTypes {
  user: any,
  message: string,
  loading: boolean,
  success: boolean,
  error: boolean,
}


export const userRolesAndPermissionsReducer = (state: UserRolesAndPersmissionsTypes = UserRolesAndPersmissionsInitialState, action: setRolesAndPermissionsActionTypes) => {
  switch (action.type) {
    case GET_USER_ROLE_AND_PERMISSIONS_REQUEST:
      return { ...state, loading: true, success: false }
    case GET_USER_ROLE_AND_PERMISSIONS_SUCCESS:
      return { ...state, loading: false, success: true, roles: action.payload }
    case GET_USER_ROLE_AND_PERMISSIONS_FAILED:
      return { ...state, loading: false, success: false, error: true, message: action.payload }
    default:
      return state
  }
}


export const userProfileReducer = (state: UserProfileTypes = UserProfileInitialState, action: setRolesAndPermissionsActionTypes) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return { ...state, loading: true, success: false }
    case GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, success: true, user: action.payload }
    case GET_USER_PROFILE_FAILED:
      return { ...state, loading: false, success: false, error: true, message: action.payload }
    default:
      return state
  }
}
