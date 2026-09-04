import axios from 'axios'
import apiClient from './client'

type AuthResponse = {
  token: string
}

// Matches the actual Mongoose schema — no username field exists on the model
export type UserProfile = {
  _id: string
  email: string
  createdAt: string
  updatedAt: string
}

export async function login(email: string, password: string) {
  const response = await apiClient.post<AuthResponse>('/api/users/login', { email, password })
  return response.data
}

export async function signup(email: string, password: string) {
  const response = await apiClient.post<AuthResponse>('/api/users/signup', { email, password })
  return response.data
}

export async function getProfile() {
  const response = await apiClient.get<UserProfile>('/api/users/me')
  return response.data
}

export async function updateProfile(email: string, password?: string) {
  const body: Record<string, string> = { email }
  if (password) body.password = password
  const response = await apiClient.put<AuthResponse>('/api/users/me', body)
  return response.data
}

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const responseError = error.response?.data as { err?: string; message?: string } | undefined
    return responseError?.err ?? responseError?.message ?? fallback
  }
  return error instanceof Error ? error.message : fallback
}