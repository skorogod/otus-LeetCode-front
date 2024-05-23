

interface RegisterPayload { username: string, email: string, password: string }

interface RegisterResponse {
    id: number,
    username: string,
    image: string,
    token: string
}

export const register = async({username, email, password}: RegisterPayload): Promise<RegisterResponse> => {
    const response = await fetch('http://localhost:80/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password,
        })
    })
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
} 