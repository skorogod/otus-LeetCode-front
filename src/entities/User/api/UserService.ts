import type { User } from '@/shared/types/User'

interface GetUserResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export const getUser = async (
  id: number,
  token: string,
  abortSignal: AbortSignal
): Promise<User> => {
  const response = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/users/${id}`, {
    signal: abortSignal,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

export const getProfile = async (token: string): Promise<User> => {
  const response = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}
