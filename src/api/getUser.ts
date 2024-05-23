export const getUser = async (id: string) => {
    try {
        const resp = await fetch(`users/${id}`)
        return await resp.json();
    }
    catch(err) {
        throw new Error(err instanceof Error ? err.message : 'getUser Error')
    }
}
