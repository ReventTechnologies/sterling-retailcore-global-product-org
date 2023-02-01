import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://customer-management-api-dev.reventtechnologies.com/v1',
  headers: {
    userid: '',
    apiKey: '',
  },
})
