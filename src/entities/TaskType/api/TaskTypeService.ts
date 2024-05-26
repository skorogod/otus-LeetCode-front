import type { TaskType } from "@/shared/types/TaskType"
import type { GetProps } from "@/shared/types/ApiProps"

export async function getTaskTypes(props: GetProps): Promise<TaskType[]> {
    const response = await fetch(
        'http://localhost:3000/task-types', {
            headers: {
                'Authorization': props.token ? `Bearer ${props.token}` :  ''
            }
        }
    )

    if (!response.ok) {
        throw new Error (response.statusText)
    }

    return await response.json()
}