import type { Status } from '@/shared/types/Status'
import type { GetProps } from '@/shared/types/ApiProps'

export async function getStatuses(props: GetProps): Promise<Status[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/statuses`, {
    headers: {
      Authorization: props.token ? `Bearer ${props.token}` : ''
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}
