import type { TaskType } from '@/shared/types/TaskType'
import type { GetProps } from '@/shared/types/ApiProps'

export async function getTaskTypes(props: GetProps): Promise<TaskType[]> {
  const response = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/task-types`, {
    headers: {
      Authorization: props.token ? `Bearer ${props.token}` : ''
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}
