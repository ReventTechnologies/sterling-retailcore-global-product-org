import axios from 'axios'

const PRUNEDGE_AUTH_URL = process.env.PRUNEDGE_AUTH_URL

const configureInterceptor = () => {
  // const api = axios.create({
  //   baseURL: process.env.REVENT_BASE_URL,
  //   // timeout: 10000,
  // });

  // Add a request interceptor to update the access token before each request
  axios.interceptors.request.use(
    async (config) => {
      // Get the current access token from local storage
      const accessToken = localStorage.getItem('@sterling_core_token')

      // If there is an access token, add it to the request headers
      if (accessToken) {
        config.headers['Content-Type'] = 'application/json'
        config.headers['Authorization'] = `Bearer ${accessToken}`
        // config.headers["environment"] = process.env.ENVIRONMENT
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Add a response interceptor to refresh the access token if it has expired
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config
      const refreshToken = localStorage.getItem('@sterling_core_refresh') || ''

      // const refreshToken = localStorage.getItem('@sterling_core_token');
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        try {
          // Make a request to the refresh token endpoint to get a new access token
          const response = await axios.post(`${PRUNEDGE_AUTH_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          })
          console.log('response', { response })
          // Save the new access token to local storage
          localStorage.setItem('@sterling_core_token', response?.data?.data.access)

          // Update the authorization header for the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`

          // Retry the original request
          return axios(originalRequest)
        } catch (error) {
          return Promise.reject(error)
        }
      }

      return Promise.reject(error)
    }
  )
}
export default configureInterceptor
