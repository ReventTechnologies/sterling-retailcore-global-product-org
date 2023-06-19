import axios from 'axios'

export const API = axios.create({
  baseURL: process.env.CUSTOMER_MANAGEMENT_URL,
  headers: {
    userid: '',
    apiKey: '',
  },
})
