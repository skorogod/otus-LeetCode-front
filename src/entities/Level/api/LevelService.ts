import type { Level } from '@/shared/types/Level'
import type { GetProps } from '@/shared/types/ApiProps'

export async function getLevels(props: GetProps): Promise<Level[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/levels`, {
    headers: {
      Authorization: props.token ? `Bearer ${props.token}` : ''
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}
