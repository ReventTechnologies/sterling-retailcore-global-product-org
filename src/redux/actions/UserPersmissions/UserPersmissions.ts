import { axiosInstance } from '@Sterling/shared'
import { Dispatch } from 'redux'
import {
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_ROLE_AND_PERMISSIONS_FAILED,
  GET_USER_ROLE_AND_PERMISSIONS_REQUEST,
  GET_USER_ROLE_AND_PERMISSIONS_SUCCESS,
} from 'Redux/constants/UserPersmissions'

const PrunedgeAuthURL = process.env.PRUNEDGE_AUTH_URL
// https://api.sterlingv2.prunedge.org/api/v1/users/profile/
interface ActionTypes {
  GET_USER_ROLE_AND_PERMISSIONS_FAILED: any
  GET_USER_ROLE_AND_PERMISSIONS_REQUEST: any
  GET_USER_ROLE_AND_PERMISSIONS_SUCCESS: any
  GET_USER_PROFILE_FAILED: any
  GET_USER_PROFILE_REQUEST: any
  GET_USER_PROFILE_SUCCESS: any
}

interface MessageAction {
  type: keyof ActionTypes
  payload: any
}
export type setRolesAndPermissionsActionTypes = MessageAction

export const getRolesAndPermissions = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: GET_USER_ROLE_AND_PERMISSIONS_REQUEST,
    })

    const { data } = await axiosInstance.get(`${PrunedgeAuthURL}/roles/?page_size=50`)
    console.log(data)
    if (data) {
      dispatch({
        type: GET_USER_ROLE_AND_PERMISSIONS_SUCCESS,
        payload: data?.results,
      })
    }
  } catch (error) {
    dispatch({
      type: GET_USER_ROLE_AND_PERMISSIONS_FAILED,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}

export const getUserProfile = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: GET_USER_PROFILE_REQUEST,
    })

    const { data } = await axiosInstance.get(`${PrunedgeAuthURL}/users/profile/`)
    //  console.log(data)
    if (data?.success) {
      dispatch({
        type: GET_USER_PROFILE_SUCCESS,
        payload: data?.data,
      })
    }
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAILED,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}
