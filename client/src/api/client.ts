import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
})

// Attach stored JWT to EVERY req so protected endpoints receive
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

if (import.meta.env.DEV) {
  apiClient.interceptors.request.use((config) => {
    console.info(`[api] -> ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, {
      params: config.params,
      bodyKeys: config.data && typeof config.data === 'object' ? Object.keys(config.data).filter((key) => !['password', 'token'].includes(key)) : [],
    })
    return config
  })

  apiClient.interceptors.response.use(
    (response) => {
      console.info(`[api] <- ${response.status} ${response.config.url}`)
      return response
    },
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.warn(`[api] <- ${error.response?.status || 'network error'} ${error.config?.url || 'unknown URL'}`)
      }
      return Promise.reject(error)
    },
  )
}

export default apiClient
