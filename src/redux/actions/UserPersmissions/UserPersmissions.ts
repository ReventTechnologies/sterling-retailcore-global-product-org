// import axios from 'axios'
import axios from 'axios'
import { Dispatch } from 'redux'
import {
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_ROLE_AND_PERMISSIONS_FAILED,
  GET_USER_ROLE_AND_PERMISSIONS_REQUEST,
  GET_USER_ROLE_AND_PERMISSIONS_SUCCESS
} from 'Redux/constants/UserPersmissions'

const SERVER_URL = `https://api.sterlingv2.prunedge.org/api`
// https://api.sterlingv2.prunedge.org/api/v1/users/profile/
interface ActionTypes {
  GET_USER_ROLE_AND_PERMISSIONS_FAILED: any
  GET_USER_ROLE_AND_PERMISSIONS_REQUEST: any
  GET_USER_ROLE_AND_PERMISSIONS_SUCCESS: any
  GET_USER_PROFILE_FAILED: any,
  GET_USER_PROFILE_REQUEST: any,
  GET_USER_PROFILE_SUCCESS: any,
}

interface MessageAction {
  type: keyof ActionTypes
  payload: any
}
export type setRolesAndPermissionsActionTypes = MessageAction

export const getRolesAndPermissions = () => async (dispatch: Dispatch) => {
  try {
    const token = localStorage.getItem("@sterling_core_token") ? localStorage.getItem("@sterling_core_token") : null

    dispatch({
      type: GET_USER_ROLE_AND_PERMISSIONS_REQUEST,
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    // Authorization: `Bearer ${token}`
    const { data } = await axios.get(`${SERVER_URL}/v1/roles/?page_size=50`, config)
    console.log(data)
    if (data) {
      dispatch({
        type: GET_USER_ROLE_AND_PERMISSIONS_SUCCESS,
        payload: data?.results
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
    const token = localStorage.getItem("@sterling_core_token") ? localStorage.getItem("@sterling_core_token") : null

    dispatch({
      type: GET_USER_PROFILE_REQUEST,
    })
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    const { data } = await axios.get(`${SERVER_URL}/v1/users/profile`, config)
    //  console.log(data)
    if (data?.success) {
      dispatch({
        type: GET_USER_PROFILE_SUCCESS,
        payload: data?.data
      })

    }
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAILED,
      payload: error?.response && error.response?.data?.message ? error?.response?.data?.message : error?.message,
    })
  }
}
