import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/sample.constants'

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, success: false, error: action.payload }

    default:
      return state
  }
}
