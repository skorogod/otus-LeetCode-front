import type { Status } from '@/shared/types/Status'
import type { GetProps } from '@/shared/types/ApiProps'

export async function getStatuses(props: GetProps): Promise<Status[]> {
  const response = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/statuses`, {
    headers: {
      Authorization: props.token ? `Bearer ${props.token}` : ''
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}
