interface LoginPayload {
  username: string
  password: string
  expiresInMins?: number
}

interface LoginResponse {
  id: number
  username: string
  email: string
  image: string
  token: string
}

export const login = async ({ username, password }: LoginPayload): Promise<LoginResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password
    })
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json()
}
