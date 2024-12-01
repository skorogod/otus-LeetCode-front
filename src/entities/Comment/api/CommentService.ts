import type { Comment } from '@/shared/types/Comment'
import type { GetProps } from '@/shared/types/ApiProps'

interface GetCommentProps extends GetProps {
  taskId: number
}

interface addCommentProps extends GetProps {
  taskId: number
  userId: number
  text: string
}

export async function getComments(props: GetCommentProps): Promise<Comment[]> {
  let BASE_URL = `${process.env.API_HOST}:${process.env.API_PORT}/comments`
  if (props.taskId) {
    BASE_URL += `?task-id=${props.taskId}`
  }
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: props.token ? `Bearer ${props.token}` : ''
    },
    signal: props.signal
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

export async function addComment(props: addCommentProps): Promise<Comment> {
  let BASE_URL = 'http://localhost:3000/comments'

  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: props.token ? `Bearer ${props.token}` : ''
    },
    body: JSON.stringify({
      taskId: props.taskId,
      userId: props.userId,
      text: props.text
    })
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}
