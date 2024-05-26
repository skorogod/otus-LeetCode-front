import type { Task } from "@/shared/types/Task"
import type { GetProps } from "@/shared/types/ApiProps"

interface Props extends GetProps {
    statusId: number,
    levelId: number,
    typeId: number,
    title: string
}

export async function getTasks(props: Props): Promise<Task[]> {
    const response = await fetch(
        'http://localhost:3000/tasks', {
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