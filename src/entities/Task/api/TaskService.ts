import type { Task } from '@/shared/types/Task'
import type { GetProps } from '@/shared/types/ApiProps'

interface GetTasksProps extends GetProps {
  filters?: {
    statusId: number
    levelId: number
    typeId: number
    title: string
  }
}

interface GetTaskProps extends GetProps {
  taskId: number
}

export async function getTasks(props: GetTasksProps): Promise<Task[]> {
  const response = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/tasks`, {
    headers: {
      Authorization: props.token ? `Bearer ${props.token}` : ''
    }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

export async function getTask(props: GetTaskProps): Promise<Task> {
  const response = await fetch(
    `${process.env.API_HOST}:${process.env.API_PORT}/tasks/${props.taskId}`,
    {
      headers: {
        Authorization: props.token ? `Bearer ${props.token}` : ''
      },
      signal: props.signal
    }
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}
